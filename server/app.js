// general modules
const express = require('express') 
const cors = require('cors')

const app = express()

// allow all cross origin requests
app.use(cors())

// parse incoming requests of content-type - application/json
app.use(express.json())

// parse incoming requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get("/api/test", (req, res) => {
    return res.status(200).send({msg: "Hello world~"})
})

module.exports = app