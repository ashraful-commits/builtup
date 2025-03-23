const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendAMail = async (to, data) => {
  try {
    // Validate environment variables
    if (
      !process.env.MAIL_ENV_HOST ||
      !process.env.MAIL_ENV_PORT ||
      !process.env.MAIL_ENV_USER ||
      !process.env.MAIL_ENV_PASS
    ) {
      throw new Error("Missing email configuration in environment variables.");
    }

    // Create transport
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_ENV_HOST,
      port: parseInt(process.env.MAIL_ENV_PORT, 10),
      secure: process.env.MAIL_ENV_PORT === "465", // true for port 465
      auth: {
        user: process.env.MAIL_ENV_USER,
        pass: process.env.MAIL_ENV_PASS,
      },
    });

    // Send mail
    await transport.sendMail({
      from: {
        name: "Builtup - Construction", // Use a recognizable sender name
        address: process.env.MAIL_ENV_USER,
      },
      to: to,
      subject: `Complete Your Activation, ${data.name}`,
      text: "Account Verification",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Verification</title>
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <!-- Company Logo -->
    <div style="text-align: start; margin-bottom: 20px;">
      <img src="https://builtup.onrender.com/images2/reliable.png" alt="Builtup - Construction Logo" style="width: 300px; height: auto;">
    </div>
    <h2>Hi ${data.name},</h2>
    <p>We noticed you recently signed up for an account with us. To complete your Activation, please click the button below:</p>
    <a href="${data.link}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Complete Activation</a>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Thanks,<br>The Team</p>
  </div>
</body>
</html>`,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendAMail,
};
