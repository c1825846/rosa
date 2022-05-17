const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodSubcategorySchema = new Schema({
    subcategory: {
        type: String,
        unique: true,
    },
    parent: String,
})

module.exports = mongoose.model('GoodSubcategory', goodSubcategorySchema)