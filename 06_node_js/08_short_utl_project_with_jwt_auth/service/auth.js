const jwt = require('jsonwebtoken')
const secretKey = '45@asds$e67fsdf54sd54s5a4'

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secretKey)
}

function getUser(token) {
    if(!token) return null
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        // console.log('Token Error:', error);
        return null
    }
}

module.exports = {
    setUser,
    getUser
}