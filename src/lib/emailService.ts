
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
    },
});


export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
    if (!GMAIL_USER || !GMAIL_PASS) {
        console.error('Gmail credentials are not set in .env. Email sending skipped.');

        console.log(`--- Simulating Email Send (Missing Credentials) ---`);
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${text}`);
        console.log(`-------------------------------------------------`);
        return;
    }

    try {
        await transporter.sendMail({
            from: GMAIL_USER, 
            to: to,           
            subject: subject, 
            text: text,       
        });
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
};
