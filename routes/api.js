const {Router} = require('express')
const router = new Router()
const mongoose = require('mongoose')
const path = require('node:path')
const pdf = require('pdf-creator-node')
const fs = require('node:fs')

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

router.get('/orders', async (req, res) => {
    const orders = await Order.find({})
    res.json(orders)
})

router.get('/approveOrder/:id', async (req, res) => {
    const order = await Order.findOne({_id: req.params.id})
    const cart = order.cart
    let canApprove = true
    for (const item of cart) {
        const good = await Good.findOne({code: item.good})
        if (good.quantity < item.quantity)
            canApprove = false
    }
    if (canApprove) {
        for (const item of cart) {
            const good = await Good.findOne({code: item.good})
            good.quantity -= item.quantity
            await good.save()
        }
        order.approvedDate = Date.now()
        order.save()
    }
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

router.get('/approvedOrders', async (req, res) => {
    const orders = await Order.find({
        $and: [
            {
                approvedDate: {$exists: true}
            },
            {
                shippedDate: {$exists: false}
            }
        ]
    })
    res.json(orders)
})

router.get('/shipOrder/:id', async (req, res) => {
    const order = await Order.findOne({_id: req.params.id})
    order.shippedDate = Date.now()
    order.save()
    res.json(order)
})

router.get('/priceList', async (req, res) => {
    const goodsRaw = await Good.find({})
    const goods = JSON.parse(JSON.stringify(goodsRaw))
    const template = fs.readFileSync(path.join(__dirname, '../templates/price-list.html'), 'utf-8')
    const pdfOptions = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
    }
    const date = new Date(Date.now())
    const priceList = {
        html: template,
        data: {
            goods: goods,
            date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        },
        path: './uploads/priceList.pdf',
        type: '',
    }
    pdf.create(priceList, pdfOptions)
        .then(result => {
            res.json('ok')
            res.json('ok')
        })
        .catch(err => {
        })

})

router.post('/clients', async (req, res) => {
    const {login, password, lastname, name, middlename, organization, eMail, phone} = req.body
    const user = new User({
        login, password, lastname, name, middlename, organization, eMail, phone, role: 'client'
    })
    await user.save()
    res.json(user)
})

router.get('/clients', async (req, res) => {
    const clients = await User.find({role: 'client'})
    res.json(clients)
})

router.delete('/good/:code', async (req, res) => {
    await Good.deleteOne({'code': req.params.code})
    res.json({message: 'deleted'})
})

router.post('uploadCatalog', async (req, res) => {

})


module.exports = router