const express = require('express')

const { connectMongoDb } = require('./db/connection')
const { visitGeneratedURL } = require('./controllers/url.controllers')
const URL = require('./models/url.model')

const urlRoute = require('./routes/url.router')
const app = express()
const port = 4000

connectMongoDb('mongodb://localhost:27017/short-url')

app.use(express.json())

app.use('/url', urlRoute)

app.get('/:shortId', visitGeneratedURL)

app.listen(port, () => console.log(`app started on: http://localhost:${port} successfully`))