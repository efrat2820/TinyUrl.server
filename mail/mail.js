import nodemailer from "nodemailer";
import registerEmail from './mailContext/registerEmail.js'
import addLinkEmail from './mailContext/addLinkEmail.js'
import targetEmail from './mailContext/targetEmail.js'
// import userModel from "./Models/userModel";

const fromEmail = 'tinyurl.em@gmail.com';
const pass = "mqixwjdsxxylcmag";

const MailSender = {
    sendEmail:async(name,sendToEmail,link)=>{
        console.log('send email')

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: fromEmail, 
            pass: pass,
            },
        });

        let info = await transporter.sendMail({
            from: fromEmail, // sender address
            to: sendToEmail, // list of receivers
            subject: "TinyUrl", // Subject line
           // text: "it is my tiny url app", // plain text body
            html:addLinkEmail(name,link) , // html body
        });
        console.log(addLinkEmail(name,link));
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    ,
    sendEmailTarget:async(name,sendToEmail,link)=>{
        console.log('send email')

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: fromEmail, 
            pass: pass,
            },
        });

        let info = await transporter.sendMail({
            from: fromEmail, // sender address
            to: sendToEmail, // list of receivers
            subject: "Hello ✔ this is my app👻", // Subject line
            //text: "it is my tiny url app", // plain text body
            html: targetEmail(name,targetLink), // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    },
//v
    sendEmailRegister:async(name,sendToEmail)=>{
        console.log('send email register')

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: fromEmail, 
            pass: pass,
            },
        });

        let info = await transporter.sendMail({
            from: fromEmail, // sender address
            to: sendToEmail, // list of receivers
            subject: "register-tinyurl", // Subject line
            text: "it is my tiny url app", // plain text body
            html: registerEmail(name), // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

export default MailSender