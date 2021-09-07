//Imports @ the top 
const express = require("express");
const messages = require("./messageModel")

//Make an instance of Express
const server = express()

//Employ Global Middleware
server.use(express.json())

//Get All Messages
server.get('/messages/all', (req, res) => {
    messages.findAll()
        .then((msgs) => {
            res.json({ message: msgs })
        })
        .catch((err) => {
            res.status(500).json({ 
                error: err.message,
                message: "You DON'T have mail."})
        })
})

server.get('/messages/:id', async (req, res) => {
    try {
        const theMessage = await messages.findByID(req.params.id)
        res.json(theMessage)
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            message: "Yeah, that email doesn't exist."
        })
    }
})

module.exports = server