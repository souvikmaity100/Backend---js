// const http = require('http')
const express = require('express')

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from Home')
})

app.get('/about', (req, res) => {
    return res.send('Hello from About')
})

app.get('/login', (req, res) => {
    return res.send(`Hello ${req.query.name}`)
})

app.post('/signup', (req, res) => {
    return res.send('Successfully Signup')
})

app.listen(3000, () => console.log("server started on: http://localhost:3000"))

// const myServer = http.createServer(app)


// myServer.listen(4000, () => console.log("server started on: http://localhost:4000"))
