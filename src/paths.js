//Imports @ the top 
const express = require("express")
const cors = require("cors")
const messages = require("./messageModel")

//Make an instance of Express
const server = express()

//Employ Global Middleware
server.use(express.json())
server.use(cors())

/* Get Welcome */
server.get('/', (req, res, next) => {
    res.json("Hi there. It seems you have found my API.")
})

/* Get All Messages */
server.get('/messages/all', (req, res, next) => {
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

/* Get Message by ID */
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
/* Post New Message */
server.post('/messages', async (req, res, next) => {
    try {
        messages.create({...req.body})
        res.json("New message posted!")
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            message: "No post for you."
        })

    }
})

module.exports = server