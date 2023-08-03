// DEPENDENICES
const express = require('express')
const app = express()
require("dotenv").config()

// DATABASE CONNECTION
const mongoose = require('mongoose')
const db = mongoose.connection
const uri = `mongodb+srv://${process.env.MONGODB}.mongodb.net/?retryWrites=true&w=majority`

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
connect()

// ???


// SERVER PORT
app.listen(process.env.PORT, () => {
    console.log('Server started on port 4000')
    console.log('Direct link: http://localhost:4000')
})