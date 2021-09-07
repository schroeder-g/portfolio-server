//Imports @ the top 
const express = require("express");
const messages = require("./messageModel")

//Make an instance of Express
const server = express()

//Employ Global Middleware
server.use(express.json())

//Get All Messages
server.get('/messages/all', (req, res) => {
    console.log("something happened")
    messages.findAll()
        .then((msgs) => {
            res.json({ message: msgs })
        })
        .catch((err) => {
            res.json({ message: err})
        })
})

module.exports = server