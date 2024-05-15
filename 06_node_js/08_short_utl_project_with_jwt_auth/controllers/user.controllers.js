const User = require('../models/user.model')
const { setUser } = require('../service/auth')

async function userSignUp(req, res){
    const { name, email, password } = req.body
    await User.create({
        name,
        email,
        password
    })

    return res.redirect('/')
}

async function userLogIn(req, res){
    const { email, password } = req.body
    const user = await User.findOne({email, password})
    if(!user) return res.render('login',{
        error: 'Invalid Email or Password'
    })

    const token = setUser(user)
    res.cookie('userToken', token)
    return res.redirect('/')
}


module.exports = {
    userSignUp,
    userLogIn
}