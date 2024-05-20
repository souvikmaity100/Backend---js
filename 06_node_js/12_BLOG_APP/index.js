const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
var cookieParser = require('cookie-parser')
const { checkAuthenticationCookie } = require("./middlewares/authentication.middleware")

const userRoute = require("./routes/user.router")
const blogRoute = require("./routes/blog.router")

const Blog = require("./models/blog.model")


const app = express()
const PORT = 8000

mongoose.connect("mongodb://localhost:27017/i_blog").then( e => console.log("MongoDB Connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public"))
app.use(cookieParser())
app.use(checkAuthenticationCookie('token'))

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({}).sort({"createdat": -1})
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    })
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`App started on: http://localhost:${PORT}`))