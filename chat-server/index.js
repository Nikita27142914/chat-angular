const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const mainRoutes = require("./routes/main")
const loginRoutes = require("./routes/login")
const roomsRoutes = require("./routes/rooms")

const app = express()
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)

const PORT = process.env.PORT || 3002

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


const Room = require("./models/room")
const Message = require("./models/message")
const User = require("./models/user")

app.use("/", mainRoutes)
app.use("/login", loginRoutes)
app.use("/rooms", roomsRoutes)

const connections = []

io.on("connection", socket => { 

    socket.on("authorisation", id => {
        connections.push({
            client: socket,
            id
        })
        socket.emit("authorisation_completed", true)
        console.log(`Connected: ${connections.length} sockets connected`)
    })

    socket.on("send_message", async data => {
        const room = await Room.findById(data.room).populate("users.userId")
        const user = await User.findById(data.author)
        const userName = user.name + " " + user.surname
        const memebersId = room.users.map(user => user.userId._id)
        const sendConnections = connections.filter(connection => memebersId.includes(connection.id)) 

        const msg = {
            authorId: data.author,
            authorName: userName,
            content: data.messageText,
            roomId: data.room
        }

        for (let i in sendConnections) {
            sendConnections[i].client.emit("get_message", msg)
        }

        const message = new Message({
            content: msg.content,
            roomId: msg.roomId,
            userId: msg.authorId
        }) 

        await message.save()
    })

    socket.on("disconnect", () => {
        connections.splice(connections.indexOf(socket), 1)
        console.log(`Disconnected: ${connections.length} sockets connected`)
    })
})

async function start() {
    try {
        const url = "mongodb+srv://Nikita27142914:27142914Nik@cluster0-i4x9u.mongodb.net/shop?retryWrites=true&w=majority"
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT} PORT`)
        })
    } catch(error) {
        console.log(error)
    }
}

start()
