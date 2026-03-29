const ContactInquiry = require('../models/ContactInquiry');
const nodemailer = require('nodemailer');

const createContactInquiry = async (req, res) => {
  try {
    const { name, email, phone, serviceOfInterest, message } = req.body;

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
    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
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
};
