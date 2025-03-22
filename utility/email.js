const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Create reusable transporter object
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Send email function
const sendAMail = async (to, data) => {
  try {
    console.log("Sending email to:", to, "with data:", data);

    const emailHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account ${data.status}</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px; }
          .container { background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); }
          .button { display: inline-block; padding: 10px 20px; background: orange; color: white; text-decoration: none; font-size: 16px; border-radius: 5px; }
          .footer { margin-top: 20px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Dear ${data.name},</h2>
          <p>You recently requested to ${data.status} your account. Click the button below to proceed:</p>
          <a href="${data.link}" class="button">${data.status} Now</a>
          <p class="footer">If you didn't request this, please ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `BuiltUp <no-reply@builtup.onrender.com>`,
      to: to,
      subject: `${data.status} Your Account`,
      text: `Account ${data.status}! Click the link to proceed: ${data.link}`,
      html: emailHTML,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendAMail };