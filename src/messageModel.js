const shortid = require("shortid");
let nodemailer = require('nodemailer')

let messages = [
    {id: shortid(), subject: "I love your style.", name: "Goober McCormick", email:"schroedergoncalves@gmail.com", message:"You are a paragon of fashion"}
]

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"schroedergoncalves@gmail.com",
        pass: "smuczbjbmmpsfaou"

    }
})

let newMessage = {
    id: shortid(), 
}

const receivingMessageOptions = {
    from: 'schroedergoncalves@email.com', 
    to: 'checkmatejunky@email.com', // list of receivers
}

const sendingMessageOptions = {
    from: 'schroedergoncalves@email.com', 
}


module.exports = {
    async findAll(){
        return messages
    },

    async findByID(id){
        return messages.find(m => m.id === id)
    },

    async create({name, email, message}){
        newMessage["email"] = email
        newMessage["name"] = name
        newMessage["message"] = message
        messages.push(newMessage)

        receivingMessageOptions["subject"] = `Aloha! New message from ${name}`
        receivingMessageOptions["html"] = 
                `<p>${message}</p><br/><p>XOXO,</p><br/><p>${name}</p>
                <p>
                    P.S. Talk to me, honey. Get back to me at 
                    <a href=mailto:${email} rel="noopener noreferrer" target="_blank">${email}</a>.
                </p>
                `
        transporter.sendMail(receivingMessageOptions, function(err, info){
            if(err){
                console.log(err)
            }
            else {
                console.log(info)
            }
        })

        sendingMessageOptions["to"] = email
        sendingMessageOptions["subject"] = "You're Awesome."
        sendingMessageOptions["html"] =
                `<p>Dear ${name},</p>
                <p>
                    Thanks for the message—there's nothing quite like 
                    receiving a well-crafted, considerate note. &nbsp;
                </p>
                <p>
                    I'll get back to you as soon as I can, 3-5 business days 
                    serving as a clichd but appropriate estimate here.
                </p
                <p>Looking forward to chatting,</p>
                <p>Alex</p>
                `
        transporter.sendMail(sendingMessageOptions, function(err, info){
            if(err){
                console.log(err)
            }
            else {
                console.log(info)
            }
        })

    }
}