const express = require('express')
const path = require('path')
require('dotenv').config()

//  Express app
const app = express()

//  Node server -> Config to socker.io
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)
require('./sockets/socket')

//  Define public path
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath))




server.listen(process.env.PORT, (err) => {
    if (err) {
        throw new Error(err);
    }
    console.log('Server runing in port:', process.env.PORT)
})