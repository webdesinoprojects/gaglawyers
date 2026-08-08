const ContactInquiry = require('../models/ContactInquiry');
const FormContent = require('../models/FormContent');
const nodemailer = require('nodemailer');
const { verifyRecaptcha } = require('../utils/verifyRecaptcha');
const cloudinary = require('../config/cloudinary');

const uploadResumeToCloudinary = (fileBuffer, originalName = 'resume') =>
  new Promise((resolve, reject) => {
    const baseName = String(originalName || 'resume')
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .slice(0, 80);

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'gaglawyers/careers/resumes',
        resource_type: 'raw',
        public_id: `${Date.now()}-${baseName || 'resume'}`,
        overwrite: false,
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    stream.end(fileBuffer);
  });

const createContactInquiry = async (req, res) => {
  try {
    const { name, email, phone, serviceOfInterest, message, captchaToken, formIdentifier } = req.body;
    let resumeMeta = {
      resumeUrl: '',
      resumePublicId: '',
      resumeOriginalName: '',
      resumeBytes: 0,
    };

    const requestedFormIdentifier = String(formIdentifier || 'contact').trim().toLowerCase();
    const formConfig = await FormContent.findOne({ formIdentifier: requestedFormIdentifier }).lean();
    const requiredFieldNames = Array.isArray(formConfig?.fields)
      ? formConfig.fields
          .filter((field) => field?.isVisible !== false && field?.isRequired)
          .map((field) => String(field.fieldName || '').trim())
          .filter(Boolean)
      : [];

    const payload = {
      ...req.body,
      serviceOfInterest: serviceOfInterest || req.body.service || '',
      message: message || req.body.description || req.body.legalIssue || '',
    };

    const fieldAliases = {
      service: ['serviceOfInterest', 'service'],
      serviceOfInterest: ['serviceOfInterest', 'service'],
      message: ['message', 'description', 'legalIssue'],
      description: ['description', 'message', 'legalIssue'],
      legalIssue: ['legalIssue', 'description', 'message'],
      fullName: ['fullName', 'name'],
      name: ['name', 'fullName'],
    };

    const missingRequiredFromConfig = requiredFieldNames.filter((fieldName) => {
      const aliasKeys = fieldAliases[fieldName] || [fieldName];
      const hasValue = aliasKeys.some((key) => {
        const value = payload[key];
        return value !== undefined && value !== null && String(value).trim() !== '';
      });
      return !hasValue;
    });

    if (missingRequiredFromConfig.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
        missingFields: missingRequiredFromConfig,
      });
    }

    const fallbackRequiredByForm = {
      contact: ['name', 'email', 'phone', 'serviceOfInterest', 'message'],
      appointment: ['name', 'email', 'phone'],
      consultation: ['name', 'email', 'phone'],
      newsletter: ['email'],
      callback: ['name', 'phone'],
      career: ['name', 'email', 'phone'],
    };

    if (!formConfig) {
      const fallbackFields = fallbackRequiredByForm[requestedFormIdentifier] || ['name', 'email', 'phone'];
      const missingFallbackFields = fallbackFields.filter((fieldName) => {
        const aliasKeys = fieldAliases[fieldName] || [fieldName];
        const hasValue = aliasKeys.some((key) => {
          const value = payload[key];
          return value !== undefined && value !== null && String(value).trim() !== '';
        });
        return !hasValue;
      });

      if (missingFallbackFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields',
          missingFields: missingFallbackFields,
        });
      }
    }

    const isCaptchaValid = await verifyRecaptcha(captchaToken, req.ip);
    if (!isCaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed',
      });
    }

    // FORM-01 attribution. Prefer what the client reports; fall back to the
    // Referer header so a lead is still traceable if the field is missing.
    const refererPath = (() => {
      try {
        return new URL(req.get('referer') || '').pathname;
      } catch {
        return '';
      }
    })();
    const attribution = {
      sourcePage: String(req.body.sourcePage || refererPath || '').slice(0, 300),
      sourceUrl: String(req.body.sourceUrl || req.get('referer') || '').slice(0, 600),
      formIdentifier: requestedFormIdentifier,
      utmSource: String(req.body.utmSource || '').slice(0, 120),
      utmMedium: String(req.body.utmMedium || '').slice(0, 120),
      utmCampaign: String(req.body.utmCampaign || '').slice(0, 120),
    };

    // FORM-01 duplicate-submission prevention: a double-click, an impatient
    // re-submit or a network retry must not create a second lead. Treated as
    // success so the visitor still sees confirmation rather than an error.
    const DUPLICATE_WINDOW_MS = 60 * 1000;
    const duplicateMatch = {
      createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      message: payload.message || '',
      // Scoped to the same form: someone who books an appointment and then also
      // sends a contact enquiry within the window is two real leads, not one.
      formIdentifier: requestedFormIdentifier,
    };
    if (email) duplicateMatch.email = String(email).trim().toLowerCase();
    else if (phone) duplicateMatch.phone = String(phone).trim();

    if (email || phone) {
      const existing = await ContactInquiry.findOne(duplicateMatch).sort({ createdAt: -1 });
      if (existing) {
        return res.status(200).json({
          success: true,
          duplicate: true,
          message: 'Inquiry already received',
          data: existing,
        });
      }
    }

    if (req.file) {
      try {
        const uploadResult = await uploadResumeToCloudinary(req.file.buffer, req.file.originalname);
        resumeMeta = {
          resumeUrl: uploadResult.secure_url || uploadResult.url || '',
          resumePublicId: uploadResult.public_id || '',
          resumeOriginalName: req.file.originalname || '',
          resumeBytes: req.file.size || 0,
        };
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: 'Resume upload failed. Please try again.',
          error: uploadError.message,
        });
      }
    }

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      serviceOfInterest: payload.serviceOfInterest,
      message: payload.message,
      ...resumeMeta,
      ...attribution,
    });

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const enquiryRecipients = [
          'contact@gaglawyers.com',
          'advocaterahulgrover@gmail.com',
        ];

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: enquiryRecipients.join(','),
          subject: `New Contact Inquiry - ${payload.serviceOfInterest}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${payload.serviceOfInterest}</p>
            <p><strong>Message:</strong></p>
            <p>${payload.message}</p>
            ${resumeMeta.resumeUrl ? `<p><strong>Resume:</strong> <a href="${resumeMeta.resumeUrl}" target="_blank" rel="noopener noreferrer">${resumeMeta.resumeOriginalName || 'View Resume'}</a></p>` : ''}
            ${attribution.sourcePage ? `<hr /><p><strong>Enquiry came from:</strong> ${attribution.sourcePage}</p>` : ''}
            ${attribution.utmCampaign ? `<p><strong>Campaign:</strong> ${attribution.utmCampaign} (${attribution.utmSource}/${attribution.utmMedium})</p>` : ''}
          `,
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const getAllContactInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
    
    console.log('✅ Retrieved contact inquiries:', inquiries.length);
    
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
      message: inquiries.length > 0 ? `Found ${inquiries.length} inquiries` : 'No inquiries found'
    });
  } catch (error) {
    console.error('❌ Error retrieving inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['new', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, in-progress, or resolved',
      });
    }

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

const deleteContactInquiry = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

    if (inquiry.resumePublicId) {
      try {
        await cloudinary.uploader.destroy(inquiry.resumePublicId, { resource_type: 'raw' });
      } catch (cloudinaryError) {
        console.error('Cloudinary resume deletion error:', cloudinaryError);
      }
    }

    await ContactInquiry.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  createContactInquiry,
  getAllContactInquiries,
  updateContactStatus,
  deleteContactInquiry,
};
