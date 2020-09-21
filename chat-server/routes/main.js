const { Router } = require("express")
const Room = require("../models/room")
const User = require("..//models/user")

const router = Router()

router.get("/", async(req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"})
    res.write("<h1>Chat Server</h1>")
    res.end()
})

module.exports = router
