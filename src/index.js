require('dotenv').config()
const server = require('./paths')
 //hi
const port = process.env.PORT
server.listen(port, () => {
    console.log(`Server running on ${port}`);
})