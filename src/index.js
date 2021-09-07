const express = require("express");
const server = express();

server.get('/hello', (req, res) => {
   res.json({ message: "hello!"})
});

server.listen(5000, () => {
    console.log("server running on 5000");
})