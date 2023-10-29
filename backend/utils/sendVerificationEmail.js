import nodemailer from 'nodemailer';

const sendVerificationEmail = (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const verificationLink = `https://website.com/verify-email?token=${verificationToken}`;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `<p>Click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending verification email: ', error);
        } else {
            console.log('Verification email sent: ' + info.response);
        }
    });
};

export default sendVerificationEmail;
