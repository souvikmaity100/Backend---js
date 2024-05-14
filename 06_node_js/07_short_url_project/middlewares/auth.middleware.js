const { getUser } = require('../service/auth')

async function checkUserLoginStatus(req, res, next) {
    const userId = req.cookies?.userId
    if(!userId) return res.redirect('/login')

    const user = getUser(userId)

    if(!user) return res.redirect('/login')
    
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    const userId = req.cookies?.userId

    const user = getUser(userId)

    req.user = user
    next()
}

module.exports = {
    checkUserLoginStatus,
    checkAuth
}