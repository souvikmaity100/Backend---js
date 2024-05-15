const { getUser } = require('../service/auth')

async function checkUserLoginStatus(req, res, next) {
    const userToken = req.cookies?.userToken
    if(!userToken) return res.redirect('/login')

    const user = getUser(userToken)

    if(!user) return res.redirect('/login')
    
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    const userToken = req.cookies?.userToken

    const user = getUser(userToken)


    req.user = user
    next()
}

module.exports = {
    checkUserLoginStatus,
    checkAuth
}