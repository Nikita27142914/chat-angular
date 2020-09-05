const { Schema, model } = require("mongoose")

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = model("Message", messageSchema)
