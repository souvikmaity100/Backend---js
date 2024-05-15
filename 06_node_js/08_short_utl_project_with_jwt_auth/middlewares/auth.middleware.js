const { getUser } = require('../service/auth')

async function checkUserLoginStatus(req, res, next) {
    const userToken = req.headers["authorization"]
    if(!userToken) return res.redirect('/login')

    const token = userToken.split('Bearer ')[1] // "Bearer fah54dfdsf5sff45sf"
    const user = getUser(token)

    if(!user) return res.redirect('/login')
    
    req.user = user
    next()
}

async function checkAuth(req, res, next) {
    const userToken = req.headers["authorization"]

    console.log("abcd----------",req.headers);

    const token = userToken.split('Bearer ')[1] // "Bearer fah54dfdsf5sff45sf"
    const user = getUser(token)


    req.user = user
    next()
}

module.exports = {
    checkUserLoginStatus,
    checkAuth
}