// DEPENDENICES
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
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

app.use(cors())
app.use(express.json());

// API

app.post('/api/registration', async (req, res) => {
    try {
        const userData = req.body
        const hash = await bcrypt.hash(userData.password, 10)
        userData.password = hash
        res.status(200).send('Received')
        db.collection('test').insertOne(userData, async (error, collection) => {
            if (error) {
                throw error
            }
        })
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
                db.collection('test')
                const compare = await bcrypt.compare(userData.password, user.password)
                if (compare) {
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

// SERVER PORT
app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000')
    console.log('Direct link: http://localhost:4000')
})