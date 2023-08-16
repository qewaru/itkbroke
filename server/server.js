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
        const existCheck = await db.collection('test').findOne({email: userData.email })
        if (existCheck) {
            return res.send('Exist')
        } else {
            const hash = await bcrypt.hash(userData.password, 10)
            userData.password = hash
            db.collection('test').insertOne(userData, async (err, user) => {
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
        db.collection('test').findOne({ email: userData.email }, async (err, user) => {
            if (err) {
                throw err
            }
            
            if (user) {
                const compare = await bcrypt.compare(userData.password, user.password)
                if (compare) {
                    const token = jwt.sign({email: user.email}, process.env.SECRET)
                    res.cookie('jwt', token,  { httpOnly: true, secure: false })
                    res.status(200).send('Allowed')
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
    try {
        const userEmail = req.body
        db.collection('test').findOne({ email: userEmail.email }, async (err, user) => {
            if (err) {
                throw err
            }

            if (user) {
                const newRole = user.role = 'pending'
                await db.collection('test').updateOne(
                    { email: user.email },
                    { $set: { role: newRole } }
                )
                return res.send('Pending')
            } else {
                return res.send('NotFound')
            }
        })
    } catch (err) {
        throw err
    }
}) 

app.get('/api/auth', async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        try {
            const decodeToken = jwt.verify(token, process.env.SECRET)
            const userEmail = decodeToken.email
            db.collection('test').findOne({ email:userEmail }, async (err, user) => {
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

// SERVER PORT
app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000')
    console.log('Direct link: http://localhost:4000')
})