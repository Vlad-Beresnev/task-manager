const mongoose = require('mongoose')

// url because we use .env
const connectDB = (url) => {
    return mongoose.connect(url)
}

// hide Deprecation warning 
process.noDeprecation = true

module.exports = connectDB