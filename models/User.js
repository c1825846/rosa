const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
   login: {
       type: String,
       unique: true,
   },
    password: String,
    lastname: String,
    middlename: String,
    organization: String,
    name: String,
    eMail: String,
    phone: String,
    role: String,
})

module.exports = mongoose.model('User', userSchema)