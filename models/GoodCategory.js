const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodCategorySchema = new Schema({
    category: {
        type: String,
        unique: true,
    }
})

module.exports = mongoose.model('GoodCategory', goodCategorySchema)