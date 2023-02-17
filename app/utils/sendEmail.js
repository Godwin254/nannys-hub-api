const nodemailer = require('nodemailer');

module.exports = async (options) => {
    const { email, subject, message } = options;
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            service: process.env.SMTP_SERVICE,
            post: Number(process.env.SMTP_PORT),
            secure: Boolean(process.env.SMTP_SECURE),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: `"NannysHub Ke" <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            text: message
        }

        await transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Error occured while sending email: ", err);
            }
            console.log(`Email sent: ${info}`);
        });

    }catch(err){
        console.log("Email not sent: ", err);
    }
}