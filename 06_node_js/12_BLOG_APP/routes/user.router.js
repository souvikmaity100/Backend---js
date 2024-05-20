const { Router } = require("express")
const { renderSignin, renderSignup, handelSignup, handelSignin, handelLogout } = require("../controllers/user.controller")
const { fileUpload } = require("../middlewares/multer.middleware")
const router = Router()


router.get('/signin', renderSignin)

router.get('/signup', renderSignup)

router.post('/signup', fileUpload('images').single('profileImage'), handelSignup)

router.post('/signin', handelSignin)

router.get('/logout', handelLogout)


module.exports = router