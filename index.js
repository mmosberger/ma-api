const express = require("express");
const app = express()
const morgan = require('morgan');


const PORT = 8080

const router = require('./routes/test.js')

app.use(router)

app.use(morgan('short'));

app.use(express.json())

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOOT")
})

// http://localhost:8080
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})

/*
post,get db file, routes, insomnia, 7-8h

test
app.get(/test
 */