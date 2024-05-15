const express = require('express')
const { userSignUp, userLogIn } = require('../controllers/user.controllers')

const router = express.Router()

router.post('/', userSignUp)
router.post('/login', userLogIn)


module.exports = router