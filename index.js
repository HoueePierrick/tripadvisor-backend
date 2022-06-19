const express = require('express')
const app = express()

const formidableMiddleware = require('express-formidable');
app.use(formidableMiddleware());

require('dotenv').config()

const cors = require(`cors`)
app.use(cors())

const mailgun = require("mailgun-js");
const DOMAIN = process.env.DOMAIN_NAME;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});

const isemail = require(`../../BackEnd/Vinted/Usefull functions/email`)
const data = {
	from: 'TripAdvisor <sofialioui@gmail.com>',
	to: 'houee.pierrick@gmail.com',
	subject: 'Recent account connexion',
	text: 'Testing some Mailgun awesomness!'
};

app.post('/connexion', function (req, res) {
    try {
        const collected = Object.keys(req.fields);
        if(collected.includes(`Prénom`) && collected.includes(`Nom`) && collected.includes(`Email`) && collected.includes(`Text`)) {
            if(isemail(req.fields.Email)) {
                if(req.fields.Prénom) {
                    if(req.fields.Nom) {
                        const data = {
                            from: 'TripAdvisor <sofialioui@gmail.com>',
                            to: req.fields.Email,
                            subject: 'Recent account connexion',
                            text: `Dear ${req.fields.Prénom} ${req.fields.Nom},\n\nWe've just noticed a recent connexion on your account. If it wasn't you, please contact our support.`
                        };
                        mg.messages().send(data, function (error, body) {
                            console.log(body);
                        });
                        res.status(200).json(`Email sent with success`)
                    } else {
                        res.status(404).json(`Please provide a Nom`)
                    }
                } else {
                    res.status(404).json('Please provide a Prénom')
                }
            } else {
                res.status(400).json('Please provide a correct email')
            }
        } else {
            res.status(400).json(`The list of received fields is incorrect`)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.all('*', (req, res) => {
    res.status(404).json(`This route doesn't exist`)
})

app.listen(process.env.PORT)