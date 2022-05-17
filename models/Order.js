const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
    client: String,
    cart: [{
        good: Number,
        quantity: Number
    }],
    receivedDate: Date,
    approvedDate: Date,
    shippedDate: Date,
})

module.exports = mongoose.model('Order', orderSchema)