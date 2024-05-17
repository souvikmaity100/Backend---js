const path = require('path')
const express = require('express')
const multer = require('multer')
const { log } = require('console')

const app = express()
const port = 4000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `IMG-${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    return res.render("home")
})

app.post("/upload", upload.single('uaerImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/')
})


app.listen(port, () => console.log(`server started on: http://127.0.0.1:${port}`))