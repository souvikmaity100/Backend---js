const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
var cookieParser = require('cookie-parser')
const { checkAuthenticationCookie } = require("./middlewares/authentication.middleware")

const userRoute = require("./routes/user.router")


const app = express()
const PORT = 8000

mongoose.connect("mongodb://localhost:27017/i_blog").then( e => console.log("MongoDB Connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public"))
app.use(cookieParser())
app.use(checkAuthenticationCookie('token'))

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})

app.use('/user', userRoute)

app.listen(PORT, () => console.log(`App started on: http://localhost:${PORT}`))