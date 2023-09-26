// NOTES

// DEPENDENICES
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const stripe = require('stripe')(`${process.env.STRIPE}`)
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

app.post('/api/stripeHook', express.raw({type: 'application/json'}), async (req, res) => {
    const sign = req.headers['stripe-signature']
    const endpointSecret = 'whsec_06f8caa18f910c491b8eef8905a61eb9c5268f85521ccf3da9dd22fabe05ff6f'
    let event
    try {
        const payload = req.body
        event = stripe.webhooks.constructEvent(payload, sign?.toString(), endpointSecret)
    } catch (error) {
        res.status(400).send(error)
        return
    }

    if (event.type === 'checkout.session.completed') {
        const customerEmail = event.data.object.customer_details.email
        await db.collection('purchase').findOne({ customer: customerEmail, payment: 'in process' }, async (err, user) => {
            if (err) {
                throw err
            }

            if (user) {
                await db.collection('purchase').updateOne(
                    {customer: customerEmail, payment: 'in process'},
                    { $set: { payment: 'session_completed' }}
                )
            }

            res.send(200)
        })
    } else {
        res.send(200)
    }
})

app.use(express.json({limit: '10mb'}))
app.use((req, res, next) => {
    if (req.originalUrl === '/api/stripeHook') {
      next()
    } else {
        express.json({limit: '10mb'})(req, res, next)
    }
  })
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb' }))

// API

app.post('/api/checkout', async (req, res) => {
    const data = req.body
    const token = req.cookies.jwt
    try {
        const decodeToken = jwt.verify(token, process.env.SECRET)
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
              success_url: 'http://localhost:3000/pages/cart/checkout/success',
              cancel_url: 'http://localhost:3000/pages/cart/checkout/cancel',
        })

        const paymentData = itemData.map(item => {
            return {
                itemId: item._id,
                itemName: item.name,
                customer: decodeToken.email,
                seller: item.email,
                sessionDate: new Date().toISOString().substring(0, 10),
                payment: 'in process'
            }
        })

        paymentData.map((item) => {
             db.collection('purchase').insertOne(item, async (err, user) => {
                if (err) {
                    throw err
                }
                if (user) {
                    res.status(303).send({url: session.url})
                }
            })
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
                    const token = jwt.sign({email: userData.email}, process.env.SECRET)
                    res.cookie('jwt', token,  { httpOnly: true, secure: false, sameSite: 'none' })
                    res.status(200).send('Allowed')
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

app.post('/api/setNotifs', async (req, res) => {
    const data = req.body
    const token = req.cookies.jwt

    try {
        const decodeToken = jwt.verify(token, process.env.SECRET)
        await db.collection('users').findOne({ email: decodeToken.email }, async (err, user) => {
            if (err) {
                throw err
            }
            
            if (user) {
                await db.collection('users').updateOne(
                    { email: user.email },
                    { $set: { notifications: data } }
                )
                return res.status(200)
            }
        })
    } catch (error) {
        throw error
    }
})

app.post('/api/setFollow', async (req, res) => {
    const data = req.body
    const token = req.cookies.jwt
    const decodeToken = jwt.verify(token, process.env.SECRET)

    await db.collection('users').findOne({ email: decodeToken.email}, async (err, user) => {
        if (err) {
            throw err
        }
        
        if (user) {
            if (!user.follow.includes(data._id)) {
                await db.collection('users').updateOne(
                    { email: user.email },
                    { $push: { follow: data._id } }
                )
                
                await db.collection('brands').updateOne(
                    { _id: data._id},
                    { $push: {follows: user.email } }
                )
    
                return res.status(200).send({ follow: 'active' })
            } else {
                await db.collection('users').updateOne(
                    { email: user.email },
                    { $pull: { follow: data._id } }
                )
                
                await db.collection('brands').updateOne(
                    { _id: data._id},
                    { $pull: {follows: user.email } }
                )

                return res.status(200).send({ follow: 'inactive' })
            }  
        }
    })
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
    const token = req.cookies.jwt
    const decodeToken = jwt.verify(token, process.env.SECRET)
    try {
        const data = await db.collection('brands').findOne({shortName: params.params})
        if (data.follows.includes(decodeToken.email)) {
            data.isFollowed = true
            const length = data.follows.length
            data.followCount = length
        } else {
            data.isFollowed = false
            const length = data.follows.length
            data.followCount = length
        }
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
        const data = await db.collection('items').find({ category: 'cloth', status: 'In stock' }).toArray()
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
            throw error
        }
    } 
})

app.get('/api/getItems', async (req, res) => {
    try {
        const data = await db.collection('items').find({ status: 'In stock'}).toArray()
        if (data != []) {
            const currentDate = new Date()
            const dates = data.filter((item) => {            
                const difference = (currentDate - new Date(item.date)) / 604800000
                return difference <= 2
            })
            res.json(dates)
        } else {
            res.json({value: 'Empty'})
        }
    } catch (error) {
        throw error
    }
})

app.get('/api/getHistory', async (req, res) => {
    const token = req.cookies.jwt
    const decodeToken = jwt.verify(token, process.env.SECRET)
    const userEmail = decodeToken.email
    try {
        const purchaseData = await db.collection('purchase').find({ customer: userEmail }).toArray()
        res.json(purchaseData)
    } catch (error) {
        throw error
    }
})

app.get('/api/getSales', async (req, res) => {
    try {
        const data = await db.collection('items').find({ sale: 'yes' }).toArray()
        res.json(data)
    } catch (err) {
        throw err
    }
})

app.post('/api/getBrandItems', async (req, res) => {
    const name = req.body.shortName
    try {
        const data = await db.collection('items').find({ brandName: name }).toArray()
        res.json(data)
    } catch (err) {
        throw err
    }
})

// SERVER PORT
app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000')
})
