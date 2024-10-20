const mongoose = require("mongoose")
const { Schema } = mongoose


const messageSchema = new Schema({
    userName: String,
    message: String,
});

module.exports = mongoose.model("Message", messageSchema);