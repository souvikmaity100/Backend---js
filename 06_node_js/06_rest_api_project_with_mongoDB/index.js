const express = require('express')
const { connectMongoDb } = require('./db/connection')

const { logReqRes } = require('./middlewares')

const userRouter = require('./routes/user.routes')

const port = 3000
const app = express()


// connect to mongodb
connectMongoDb('mongodb://127.0.0.1:27017/node_project')


// Routes
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Usermanager')
})


// Middleware - 
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('req_log.txt'))


// User routes
app.use('/api/users', userRouter)


// Server
app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port} Successfully`);
})