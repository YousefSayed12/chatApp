const express = require("express")
const socket = require("socket.io")

const app = express()
const server = app.listen(5000 , () => {
    console.log("your host is 5000")
})

app.use(express.static('public_html'))

const io = socket(server)

io.on('connection' , (visitor) => {
    console.log("new visitor connected")
    visitor.on('message' , (data) => {
        io.sockets.emit('new_message' , data)
    })
})