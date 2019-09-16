const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'reijimaigo8@gmail.com',
//     from: 'reijimaigo8@gmail.com',
//     subject: 'My Send Grid test email',
//     text: 'test text here'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'reijimaigo8@gmail.com',
        subject: 'Welcome to Task app!',
        text: `Hi ${name}, Thanks for signing up!`
    })
}

const sendDeleteEmail = (email) => {
    sgMail.send({
        to: email,
        from: 'reijimaigo8@gmail.com',
        subject: 'Your account has been deleted',
        text: 'We\'re sad to see you go. If you have any suggestions on how to improve our services, please leave us a message.'
    })
}

module.exports = { sendWelcomeEmail, sendDeleteEmail }