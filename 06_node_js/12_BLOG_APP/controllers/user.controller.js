const User = require("../models/user.model")

const renderSignin = (req, res) => {
    return res.render("signin")
}

const renderSignup = (req, res) => {
    return res.render("signup")
}

const handelSignup = async (req, res) => {
    const { fullName, email, password } = req.body
    const profileImage = req.file?.filename
    if(profileImage){
        await User.create({
            fullName,
            email,
            password,
            profileImageURL: `/images/${profileImage}`
        })
    }else {
        await User.create({
            fullName,
            email,
            password
        })
    }

    return res.redirect("/")
}

const handelSignin = async (req, res) => {
    const { email, password } = req.body
    try {

        const token = await User.matchPasswordAndGenerateToken(email, password)

        return res.cookie("token", token).redirect("/")
    } catch (error) {
        return res.render('signin', {
            error: "Incorrect Email or Password"
        })
    }
}

const handelLogout = (req, res) => {
    res.clearCookie('token').redirect('/')
}


module.exports = {
    renderSignin,
    renderSignup,
    handelSignup,
    handelSignin,
    handelLogout
}