// NOTES
// Change jwt token name
// Change db collection name


// DEPENDENICES
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const app = express()
require("dotenv").config()

// DATABASE CONNECTION
const mongoose = require('mongoose')
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
app.use(express.json())
app.use(cookieParser())

// API

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

// SERVER PORT
app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000')
    console.log('Direct link: http://localhost:4000')
})