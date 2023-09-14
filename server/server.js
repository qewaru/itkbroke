// NOTES

// DEPENDENICES
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51MhsuUKRgv2CaMZJgM7NxJAscPwWUtbMwdaS7Yy3wYTYI8lBWnkVlbGCF90Co8FPqXRJlIu35AXIF9v6ZxGglp6Z00zKFZekTx')
const app = express()
require("dotenv").config()

// DATABASE CONNECTION
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const { configDotenv } = require('dotenv')
const db = mongoose.connection
const uri = `mongodb+srv://${process.env.MONGODB}.mongodb.net/itkbroke?retryWrites=true&w=majority`

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
connect()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb' }))

// API

app.post('/api/checkout', async (req, res) => {
    const data = req.body
    try {
        const itemIds = data.map((item) => new ObjectId(item.id))
        const itemData = await db.collection('items').find({ _id: { $in: itemIds } }).toArray()
        const session = await stripe.checkout.sessions.create({
            line_items: itemData.map(item => {
                return {
                  price_data: {
                    currency: 'eur',
                    product_data: {
                      name: item.name,
                    },
                    unit_amount: item.price * 100,
                  },
                  quantity: 1,
                }
              }),
              mode: 'payment',
              success_url: 'http://localhost:3000/pages/cart',
              cancel_url: 'http://localhost:3000/pages/cart/checkout',
        })
        res.status(303).send({url: session.url})
    } catch (error) {
        throw error
    }
})

app.post('/api/registration', async (req, res) => {
    try {
        const userData = req.body
        const existCheck = await db.collection('users').findOne({email: userData.email })
        if (existCheck) {
            return res.send('Exist')
        } else {
            const hash = await bcrypt.hash(userData.password, 10)
            userData.password = hash
            db.collection('users').insertOne(userData, async (err, user) => {
                if (err) {
                    throw err
                }
                if (user) {
                    res.send('Allowed')
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const userData = req.body
        db.collection('users').findOne({ email: userData.email }, async (err, user) => {
            if (err) {
                throw err
            }

            if (user) {
                const compare = await bcrypt.compare(userData.password, user.password)
                if (compare) {
                    const token = jwt.sign({email: user.email}, process.env.SECRET)
                    if (user.email === 'admin') {
                        res.status(200).send('AllowedEntry')
                    } else {
                        res.cookie('jwt', token,  { httpOnly: true, secure: false })
                        res.status(200).send('Allowed')
                    }
                } else {
                    res.send('DenyPassword')
                }
            } else {
                res.send('DenyEmail')
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/api/verification', async (req, res) => {
    const token = req.cookies.jwt
    const userData = req.body
    if (token) {
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET)
            const userEmail = decodeToken.email
            db.collection('users').findOne({ email: userEmail }, async (err, user) => {
                if (err) {
                    throw err
                }
                
                if (user) {
                    const newRole = user.role = 'pending'
                    await db.collection('users').updateOne(
                        { email: user.email },
                        { $set: { role: newRole } }
                    )

                    const brandData = {
                        ...userData,
                        date: new Date().toISOString().substring(0, 10),
                        email: user.email
                    }
                    db.collection('verify').insertOne(brandData, async (err, user) => {
                        if (err) {
                            throw err
                        }
                    })
                    return res.status(200).send(`${user.role}`)
                } else {
                    return res.status(404).send('not found')
                }
            })
        } catch (err) {
            throw err
        }
    }
})

app.post('/api/updateVerify', async (req, res) => {
    const status = req.body.status
    const data = req.body.data

    const brandData = {
            ...data,
            shortName: data.name.replace(/[^a-zA-Z0-9]/g, '')
    }

    switch (status) {
        case 'allow':
            try {
                await db.collection('brands').insertOne(brandData, async (err, user) => {
                    if (err) throw err

                    if (user) {
                        await db.collection('verify').deleteOne({ email: brandData.email })
                    }
                    return res.status(200)
                })
            } catch (error) {
                throw error
            }
        
        case 'deny':
            return res.status(400)
    }
})

app.post('/api/newItem', async (req, res) => {
    const data = req.body
    const token = req.cookies.jwt
    try {
        const decodeToken = jwt.verify(token, process.env.SECRET)
        const brandData = await db.collection('brands').findOne({ email: decodeToken.email })
        const itemData = {
            ...data,
            email: decodeToken.email,
            brandName: brandData.name,
            shortName: data.name.replace(/[^a-zA-Z0-9]/g, '')
        }
        try {
            db.collection('items').insertOne(itemData, async (err, item) => {
                if (err) throw err
    
                if (item) {
                    res.status(200).send('saved')
                }
            })
        } catch (err) {
            throw err
        }
    } catch (err) {
        throw err
    }
})

app.post('/api/getCartItems', async (req, res) => {
    const data = req.body
    try {
        const itemIds = data.map((item) => new ObjectId(item.id))
        const itemData = await db.collection('items').find({ _id: { $in: itemIds } }).toArray()
        res.json(itemData)
    } catch (error) {
        throw error
    }
})

app.get('/api/auth', async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET)
            const userEmail = decodeToken.email
            db.collection('users').findOne({ email:userEmail }, async (err, user) => {
                if (err) {
                    throw err
                }
                res.status(200).send(`${user.role}`)
            })
        } catch (err) {
            throw err
        }
    }
})

app.get('/api/getUsers', async (req, res) => {
    try {
        const userData = await db.collection('verify').find().toArray()
        res.json(userData)
    } catch (err) {
        throw err
    }
})

app.get('/api/getBrands', async (req, res) => {
    try {
        const brandList = await db.collection('brands').find().toArray()
        res.json(brandList)
    } catch (err) {
        throw err
    }
})

app.get('/api/brands', async (req, res) => {
    try {
        const data = await db.collection('brands').find().toArray()
        res.json(data)
    } catch (err) {
        throw err
    }
})

app.get('/api/brand/:params', async (req, res) => {
    const params = req.params
    try {
        const data = await db.collection('brands').findOne({shortName: params.params})
        res.json(data)
    } catch (err) {
        throw err
    }
})

app.get('/api/item/:name', async (req, res) => {
    const shortName = req.params.name
    try {
        const data = await db.collection('items').findOne({shortName: shortName})
        res.json(data)
    } catch (err) {
        throw err
    }
})

app.get('/api/userInfo', async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET)
            const userEmail = decodeToken.email
            const data = await db.collection('users').findOne({ email: userEmail })
            res.json(data)
        } catch (err) {
            throw err
        }
    }
})

app.get('/api/getClothing', async (req, res) => {
    try {
        const data = await db.collection('items').find({ category: 'cloth', status: 'In stock', sale: 'no' }).toArray()
        res.json(data)
    } catch (err) {
        throw err
    }
})

app.get('/api/browseItems', async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        const decodeToken = jwt.verify(token, process.env.SECRET)
        const userEmail = decodeToken.email

        try {
            const itemList = await db.collection('items').find({ email: userEmail }).toArray()
            res.json(itemList)
        } catch (error) {
            error
        }
    } 
})

// SERVER PORT
app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000')
    console.log('Direct link: http://localhost:4000')
})