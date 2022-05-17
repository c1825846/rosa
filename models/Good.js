const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodSchema = new Schema({
    code: {
        type: Number,
        unique: true,
    },
    title: String,
    price: Number,
    quantity: Number,
    imagePath: String,
    category: String,
    subcategory: String,
})

module.exports = mongoose.model('Good', goodSchema)