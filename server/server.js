const express = require('express')
const app = express()

const port = 4000
app.listen(process.env.PORT || port, () => {
    console.log('Server started on port 4000')
    console.log('Direct link: http://localhost:4000')
})