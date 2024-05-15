const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { ckeckForAuthentication, restrictTo } = require('./middlewares/auth.middleware')
const { connectMongoDb } = require('./db/connection')
const { visitGeneratedURL } = require('./controllers/url.controllers')


const urlRoute = require('./routes/url.router')
const staticRoute = require('./routes/static.router')
const userRoute = require('./routes/user.router')
const app = express()
const port = 4000

connectMongoDb('mongodb://localhost:27017/short-url')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(ckeckForAuthentication)


app.use('/user', userRoute)
app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute)
app.use('/', staticRoute)

app.get('/visit/:shortId', visitGeneratedURL)

app.listen(port, () => console.log(`app started on: http://localhost:${port} successfully`))