const nodeoutlook = require('nodejs-nodemailer-outlook');
require('dotenv').config();
const express = require('express');
const app = express();
var ejs = require("ejs");

const ENV = process.env;
const emailTypes = ['signup', 'forget_username', 'forget_password'];
const emailSubjects = {
    'signup': 'Verify your email address',
    'forget_username': 'Forgot my username',
    'forget_password': 'Reset password'
}

const sendEmail = (email, type) => {
    return new Promise(async (resolve, reject) => {
        if (emailTypes.indexOf(type) === -1) reject('Invalid email type');
        if (!email) reject('Invalid empty email');

        const htmlFile = await ejs.renderFile(__dirname + "/index2.ejs", { tagline: 'Spoiler Alert! Lalo Salamanka will die!!' });
    
        nodeoutlook.sendEmail({
            auth: {
                user: ENV.EMAIL,
                pass: ENV.PASSWORD
            },
            from: ENV.EMAIL,
            to: email,
            subject: emailSubjects[type],
            html: htmlFile,
            text: 'This is text version!',
            attachments: [{
                filename: 'text3.txt',
                path: 'file.txt'
            }],
            onError: (e) => {
                console.log(e);
                resolve(e);
            },
            onSuccess: (i) => {
                console.log(i);
                reject(i);
            }
        });
    });
}

app.listen(3000, () => {
    console.log('Working');
    sendEmail('example@gmail.com', 'signup').then(res => console.log(res)).catch(err => console.log(err));
});
