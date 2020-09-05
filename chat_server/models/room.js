const { Schema, model } = require("mongoose")

const roomSchema = new Schema({
    users: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ]
})

module.exports = model("Room", roomSchema)
