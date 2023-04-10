'use strict';

const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));




let htmlTop = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Joseph Houghton</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
</head>
<body>
    <header>
        <h2>Contact</h2>
    </header>
    <nav>
        <a href="index.html">Home</a>
        <a href="contact.html">Contact</a>
        <a href="gallery.html">Projects</a>
    </nav>
    <main>
        <section>
            <article>
                <h3>Contact Form</h3>
                <p>
                    This is an online Form that you can fill out to leave feedback for this website. Please fill in your
                    information with any additional comments you'd like to make. Fields outlined in red are required for
                    submitting the form.
                </p>
            </article>
        </section>
`

let htmlBottom = `
    </main>
    <footer>
        &copy; Joseph Houghton 2023
    </footer>
</body>
</html>
`   

app.post("/contact.html", (req, res) => {
    const nameField = req.body.nameField;
    const emailField =  req.body.emailField;
    const radioField = req.body.radioField;
    const checkboxField = req.body.checkboxField;
    const selectField = req.body.selectField;
    const textareaField = req.body.textareaField;
    console.log(req.body);

    let user_res =  `
        ${htmlTop}
        <h2> Here's Your Form Response: </h2>
        <section class="response-section">
            <article class="response-article">
                Your Name: <span class="single-response"> ${nameField} </span>
            </article>
            <article class="response-article">
                Your Email: <span class="single-response"> ${emailField} </span>
            </article>
            <article class="response-article">
                What I find most difficult about learning Japanese: <span class="single-response"> ${radioField} </span>
            </article>
            <article class="response-article">
                The Japanese methods that have been useful for me: <span class="single-response"> ${checkboxField} </span>
            </article>
            <article class="response-article">
                I found this site useful: <span class="single-response"> ${selectField} </span>
            </article>
            <article class="response-article">
                My comments: <span class="single-response"> ${textareaField} </span>
            </article>
        </section>
        ${htmlBottom}
    `   

    res.send(user_res);


    // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: "gideon.daniel15@ethereal.email",         //  Ethereal email here
//             pass: "J75W9ZU8TeKr2tfEqm",                   // Ethereal password here
//         },
//     });

//     let mailOptions = {
//         from: '"Joseph Houghton" "houghtjo@oregonstate.edu"',         // sender address
//         to: "houghtjo@oregonstate.edu",                              // list of receivers
//         subject: "Nodemailer Test",
//         // text: "Nodemailer Hello World", 
//         html: user_res
//     }
    
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         }
//         else {
//             console.log(`User Input emailed to: ${mailOptions.to}`);
//         }
//     });

// });





    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }

        console.log('Credentials obtained, sending message...');

        // Create a SMTP transporter object
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        // Message object
        let message = {
            from: 'Joseph Houghton <houghtjo@oregonstate.edu>',
            to: 'Joseph Houghton <houghtjo@oregonstate.edu>',
            subject: 'Nodemailer Test',
            html: user_res
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });


})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});