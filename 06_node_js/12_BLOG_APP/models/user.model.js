const { createHmac, randomBytes } = require('crypto');

const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    fullName: {
        type: String,
        reuired: true
    },
    email: {
        type: String,
        reuired: true,
        unique: true
    },
    salt: {
        type: String,
        reuired: true
    },
    password: {
        type: String,
        reuired: true
    },
    profileImageURL: {
        type: String,
        default: '/images/default_user.jpg'
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }

}, { timestamps: true })

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return 

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    this.salt = salt
    this.password = hashedPassword

    next()
})

userSchema.static('matchPassword', async function(email, password) {
    const user = await this.findOne({ email })
    if(!user) throw new Error('User Not Found')

    const salt = user.salt
    const hashedPassword = user.password
    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex')

    if (hashedPassword !== userProvidedHash) throw new Error('Incorrect password')

    return { ...user._doc, password: undefined, salt: undefined }
    

})

const User = model('User', userSchema)

module.exports = User
