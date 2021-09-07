const shortid = require("shortid");

let messages = [
    {id: shortid(), subject: "I love your style.", name: "Goober McCormick", email:"schroedergoncalves@gmail.com", message:"You are a paragon of fashion"}
]

module.exports = {
    async findAll(){
        return messages
    },

    async findByID(id){
        return messages.find(m => m.id === id)
    }
}