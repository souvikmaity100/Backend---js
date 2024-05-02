const User = require('../models/user.model')

async function getAllUsers(req, res) {
    const allDbUser = await User.find({})
    res.status(200).json(allDbUser)
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
}

async function createNewUser(req, res) {
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
}

async function updateUserById(req, res) {
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

async function deleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "user deleted successfully"})
}



module.exports = { getAllUsers, getUserById, createNewUser, updateUserById, deleteUserById }