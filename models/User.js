const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
   login: {
       type: String,
       unique: true,
   },
    password: String,
    role: String,
})

module.exports = mongoose.model('User', userSchema)