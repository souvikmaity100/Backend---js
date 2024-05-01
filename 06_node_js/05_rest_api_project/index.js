const express = require('express')
const fs = require('fs')
const users = require("./USER_DATA.json")

const port = 3000
const app = express()

// Routes
app.get('/', (req, res) => {
    return res.send('Welcome to Usermanager')
})

app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
        </ul>
    `
    return res.send(html)
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
app.get('/api/users', (req, res) => {
    // Always add X to custome header for good practice
    res.setHeader('X-creator', 'souvik') // Custom Header
    return res.json(users)
})

// Get Selected User
const getUser = (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    if (!user) res.status(404).json({ message: "User not found" })
    return res.json(user)
}

// Create a User
app.post('/api/users', (req, res) => {
    const body = req.body
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ message: "All Fields are Requied"})
    }
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./USER_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "Success", message: "user created successfully", id: users.length })
    })
})

// Update The User With Id
const updateUser = (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body
    const id = Number(req.params.id)

    const updatedUsers = users.map((user) => ((user.id === id) ? { first_name, last_name, email, gender, job_title, id } : user))

    fs.writeFile('./USER_DATA.json', JSON.stringify(updatedUsers), (err, data) => {
        return res.json({ status: "Success", message: "User Updated Successfully", id })
    })
}

// Delete The User With Id
const deleteUser = (req, res) => {
    const id = Number(req.params.id) 

    const deletedUsers = users.filter((user) => { if(!(user.id === id)) return user })

    fs.writeFile('./USER_DATA.json', JSON.stringify(deletedUsers), (err, data) => {
        return res.json({ status: "Success", message: "User Deleted Successfully", id })
    })
}

app.route('/api/users/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

// Server
app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port} Successfully`);
})