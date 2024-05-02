const express = require('express')
const { getAllUsers, getUserById, createNewUser, updateUserById, deleteUserById } = require('../controllers/user.controllers')

const router = express.Router()

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)


router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router