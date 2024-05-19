const JWT = require("jsonwebtoken")

const SECRET_KEY = "$m1007df7fd7fsh7$%%^$%^^jhfdf"

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
        username: user.fullName
    }

    const token = JWT.sign(payload, SECRET_KEY)
    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, SECRET_KEY)
    return payload
}


module.exports = {
    createToken,
    validateToken
}