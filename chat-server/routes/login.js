const { Router } = require("express")
const User = require("..//models/user")

const router = Router()


router.post("/", async(req, res) => {
    try {
        const user = await User.findOne({
            login: req.body.login,
            password: req.body.password
        })
        res.status(200).send(user._id)
    } catch(error) {
        console.log(error)
        res.status(401).send(error)
    }
})

module.exports = router
