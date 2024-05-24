require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = async (email, username) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to Scatch - Your Registration is Successful',
        text: `Dear ${username},

We are delighted to welcome you to Scatch!

Thank you for registering with us. We are excited to have you on board and look forward to providing you with exceptional service.

Should you have any questions or need assistance, please do not hesitate to contact our support team at support@scatch.com.

Best regards,
Team Scatch

Note: This is an automated email, please do not reply directly to this message.`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <p>Dear ${username},</p>
            <p>We are delighted to welcome you to <strong>Scatch</strong>!</p>
            <p>Thank you for registering with us. We are excited to have you on board and look forward to providing you with exceptional service.</p>
            <p>Should you have any questions or need assistance, please do not hesitate to contact our support team at <a href="mailto:support@scatch.com">support@scatch.com</a>.</p>
            <p>Best regards,<br>Team Scatch</p>
            <p style="font-size: 0.9em; color: #555;">Note: This is an automated email, please do not reply directly to this message.</p>
        </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        //console.log('Welcome email sent successfully');
    } catch (error) {
        //console.error('Error sending welcome email:', error);
    }
};

module.exports = { sendWelcomeEmail };
