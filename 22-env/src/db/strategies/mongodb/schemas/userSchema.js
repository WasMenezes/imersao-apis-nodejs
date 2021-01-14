const Mongoose = require('mongoose')
const userSchema = new Mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    insertedAt: {
      type: Date,
      default: new Date()
    }
})

module.exports = Mongoose.model('users', userSchema)