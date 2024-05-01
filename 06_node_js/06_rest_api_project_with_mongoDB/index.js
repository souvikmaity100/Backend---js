const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

const port = 3000
const app = express()


// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/node_project')
.then(() => console.log('mongoDB Connected'))
.catch((err) => console.log('Connection Error:', err))

// Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    jobTitle: {
        type: String
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema)



// Routes
app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Usermanager')
})


// Middleware - 
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    fs.appendFile('req_log.txt', `Req Type: ${req.method} | Req Time: ${Date.now()} | Req Path: ${req.path} | User IP: ${req.ip} \n`, (err, data) =>{
        next();
    })
    // console.log(req.path);
})


// --------------REST API--------------
// Get All Users
app.get('/api/users', async (req, res) => {
    const allDbUser = await User.find({})
    res.status(200).json(allDbUser)
})

// Get Selected User
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
}

// Create a User
app.post('/api/users', async (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body
    if(!first_name || !last_name || !email || !gender || !job_title){
        return res.status(400).json({ message: "All Fields are Requied"})
    }
    const result = await User.create({
        firstName: first_name,
        lastName: last_name,
        email: email,
        gender: gender,
        jobTitle: job_title
    })
    res.status(201).json({message: "user created successfully", id: result._id})
})

// Update The User With Id
const updateUser = async (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body
    await User.findByIdAndUpdate(req.params.id, {
        firstName: first_name,
        lastName: last_name,
        email: email,
        gender: gender,
        jobTitle: job_title
    })

    res.status(200).json({message: "user updated successfully"})
}

// Delete The User With Id
const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "user deleted successfully"})
}

app.route('/api/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

// Server
app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port} Successfully`);
})