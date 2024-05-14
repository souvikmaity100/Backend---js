const express = require('express')
const path = require('path')
const { connectMongoDb } = require('./db/connection')
const { visitGeneratedURL } = require('./controllers/url.controllers')


const urlRoute = require('./routes/url.router')
const staticRoute = require('./routes/static.router')
const app = express()
const port = 4000

connectMongoDb('mongodb://localhost:27017/short-url')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/url', urlRoute)
app.use('/', staticRoute)

app.get('/url/:shortId', visitGeneratedURL)

app.listen(port, () => console.log(`app started on: http://localhost:${port} successfully`))