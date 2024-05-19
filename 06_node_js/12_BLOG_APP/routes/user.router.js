const { Router } = require("express")
const { renderSignin, renderSignup, handelSignup, handelSignin } = require("../controllers/user.controller")

const router = Router()


router.get('/signin', renderSignin)

router.get('/signup', renderSignup)

router.post('/signup', handelSignup)

router.post('/signin', handelSignin)


module.exports = router