const User = require("../models/user.model")

const renderSignin = (req, res) => {
    return res.render("signin")
}

const renderSignup = (req, res) => {
    return res.render("signup")
}

const handelSignup = async (req, res) => {
    const { fullName, email, password } = req.body

    await User.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")
}

const handelSignin = async (req, res) => {
    const { email, password } = req.body

    const user = await User.matchPassword(email, password)

    console.log('User', user)

    return res.redirect("/")
}


module.exports = {
    renderSignin,
    renderSignup,
    handelSignup,
    handelSignin
}