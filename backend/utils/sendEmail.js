const nodemailer = require('nodemailer');

/**
 * Minimal reusable email sender.
 * Reads the same EMAIL_* env vars already used by the contact form.
 * When EMAIL_USER is empty (e.g. local Mailpit) it connects without auth.
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const port = Number(process.env.EMAIL_PORT) || 587;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'localhost',
    port,
    secure: port === 465, // true for 465, false for 587/1025
    auth: process.env.EMAIL_USER
      ? { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      : undefined,
  });

  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@gaglawyers.com',
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
