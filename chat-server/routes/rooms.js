const { Router } = require("express")
const Room = require("../models/room")
const Message = require("../models/message")

const router = Router()

function formatUsers (room, currentUserId) {
    return {_id: room._id, users: room.users.filter(user => user.userId._id.toString() !== currentUserId)}
}

function formatMessages (message) {
    const { userId } = message
    const authorId = userId._id
    const authorName = userId.name + " " + userId.surname
    return { content: message.content, authorId, authorName }
}

router.get("/", async(req, res) => {
    try {
        const currentUserId = req.headers.authorization
        const rooms = await Room.find()
        const userRooms = rooms.filter(room => room.users
            .findIndex(user => user.userId.toString() === currentUserId) !== -1)  

        const membersList = []

        for(let i in userRooms) {
            let room = await userRooms[i].populate("users.userId").execPopulate()
            membersList.push(formatUsers(room, currentUserId))
        }

        res.status(200).send(membersList)
    } catch(error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const messages = await Message.find({roomId: req.params.id}).populate("userId")
        
        const messagesList = []

        for(let i in messages) {
            messagesList.push(formatMessages(messages[i]))
        }

        res.status(200).send(messagesList)
    } catch(error) {
        console.log(error)
        res.status(500).send(console.error())
    }
})

module.exports = router
