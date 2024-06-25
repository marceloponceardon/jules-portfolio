var express = require('express'); 
var router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        replyTo: email,
        to: process.env.EMAIL_TO,
        subject: `Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
				// Include error in response body for debugging
        console.error(error);
				res.status(500);
				res.send(error);
    }
});

module.exports = router;
