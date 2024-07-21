const express = require('express')
const http = require('http');
const { Server } = require("socket.io");

const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static('./public'))

// Socket.io

io.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`)
    socket.on('user-message', mesage => {
        // console.log('User Message:', mesage);
        io.emit('message', mesage)
    })
  });




app.get('/', (req, res) => {
    return res.sendFile("/public/index.html")
})


server.listen(8000, () => console.log(`Server started at port: 8000`))