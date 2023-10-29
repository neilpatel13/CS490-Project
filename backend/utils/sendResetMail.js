import nodemailer from 'nodemailer';

const sendResetEmail = (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const resetLink = `https://website.com/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending reset email: ', error);
        } else {
            console.log('Reset email sent: ' + info.response);
        }
    });
};

export default sendResetEmail;
