const mongoose = require('mongoose')


async function connectMongoDb(url) {
    return mongoose.connect(url)
    .then(() => console.log('mongoDB Connected'))
    .catch((err) => console.log('Connection Error:', err))
}

module.exports = { connectMongoDb }