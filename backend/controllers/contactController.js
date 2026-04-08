const ContactInquiry = require('../models/ContactInquiry');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Verify reCAPTCHA token
const verifyCaptcha = async (token) => {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    // Skip verification in development if no secret key is set
    if (!secretKey) {
      console.warn('⚠️  RECAPTCHA_SECRET_KEY not set - skipping verification (development only)');
      return true;
    }

    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token
        }
      }
    );

    return response.data.success;
  } catch (error) {
    console.error('❌ Captcha verification error:', error.message);
    return false;
  }
};

const createContactInquiry = async (req, res) => {
  try {
    const { name, email, phone, serviceOfInterest, message, captchaToken } = req.body;

    // Verify captcha token
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: 'Captcha verification required',
      });
    }

    const isCaptchaValid = await verifyCaptcha(captchaToken);
    if (!isCaptchaValid) {
      return res.status(400).json({
        success: false,
        message: 'Captcha verification failed. Please try again.',
      });
    }

    // Validate required fields
    if (!name || !email || !phone || !serviceOfInterest || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      serviceOfInterest,
      message,
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

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_USER,
          subject: `New Contact Inquiry - ${serviceOfInterest}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${serviceOfInterest}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
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
    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found',
      });
    }

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
