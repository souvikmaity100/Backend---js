require('dotenv').config()
const express = require('express')
const app = express()
// const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', (req, res) => {
    res.send('<h1>Welcome to login page</h1>')
})

app.get('/signup', (req, res) => {
    res.send('<h1><center>Welcome to signup page</center></h1>')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})