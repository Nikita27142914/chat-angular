const express = require("express")
const mongoose = require("mongoose")

const app = express()
const server = require("http").createServer(app)

const PORT = process.env.PORT || 3002

app.get("/", async(req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write("<h1>Start project</h1>")
    res.end()
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
