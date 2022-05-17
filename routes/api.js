const {Router} = require('express')
const router = new Router()
const mongoose = require('mongoose')
const path = require('node:path')

const Good = require('../models/Good')
const GoodCategory = require('../models/GoodCategory')
const GoodSubcategory = require('../models/GoodSubcategory')
const User = require('../models/User')
const Order = require('../models/Order')

router.get('/goods', async (req, res) => {
    Good.find({}, (err, goods) => {
        if (err) throw err
        res.json(goods)
    })
})

router.post('/goods', async (req, res) => {
    const {code, title, price, category, subcategory} = req.body
    let params = {
        code, title, price, category, subcategory, quantity: 0,
    }
    if (req.files) {
        const image = req.files.image
        const filePath = path.join('uploads', image.name)
        await image.mv(filePath)
        params.imagePath = filePath
    } else {
        params.imagePath = path.join('uploads', 'default.png')
    }
    const good = new Good(params)
    await good.save()
    res.json(good)
})

router.post('/order', async (req, res) => {
    const {client, cart} = req.body
    const order = new Order({
        client,
        cart,
        receivedDate: Date.now()
    })
    await order.save()
    res.json(order)
})

router.post('/category', async (req, res) => {
    const category = new GoodCategory({
        category: req.body.category
    })
    await category.save()
    res.json(category)
})

router.get('/category', (req, res) => {
    GoodCategory.find({}, (err, categories) => {
        if (err) throw err
        res.json(categories)
    })
})

router.post('/subcategory', async (req, res) => {
    const {subcategory, parent} = req.body
    const category = new GoodSubcategory({
        subcategory, parent
    })
    await category.save()
    res.json(category)
})

router.get('/subcategory', (req, res) => {
    GoodSubcategory.find({}, (err, subcategories) => {
        if (err) throw err
        res.json(subcategories)
    })
})

router.post('/capitalize', async (req, res) => {
    const {goodCode, quantity} = req.body
    console.log(goodCode)
    Good.findOne({'code': goodCode}, (err, good) => {
        if (err) throw err
        good.quantity += +quantity
        good.save()
        res.json(good)
    })
})

router.post('/login', async (req, res) => {
    const {login, password} = req.body
    const user = User.findOne({login}, (err, user) => {
        if (err) throw err
        if (!user || user.password !== password) {
            res.json({message: 'неверный логин или пароль'})
            return
        }
        res.json({user})
    })
})


module.exports = router