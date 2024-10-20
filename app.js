const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const Message = require("./Schema/Schema")

const app = express();
const connectToDB = () => {
    try{
        mongoose.set("strictQuery" , false)
        mongoose.connect("mongodb+srv://yousefsayed0:456789456@app-11.kjdk1.mongodb.net/?retryWrites=true&w=majority&appName=app-11")
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.error("Could not connect to MongoDB:", err)
    }
}
connectToDB()

const server = app.listen(5000, () => {
    console.log("your host is 5000");
});

app.use(express.static('public_html'));

const io = socket(server);

io.on('connection', async (visitor) => {
    console.log("new visitor connected");

    try {
        const messages = await Message.find()
        visitor.emit('previous_messages', messages);
    } catch (err) {
        console.error("Error previous messages:", err);
    }

    visitor.on('message', (data) => {
        const newMessage = new Message(data);
        newMessage.save()
        try{
            io.sockets.emit('new_message', data);
        }
        catch(err){
            console.error("Error insaving message:", err);
        }
    });
});