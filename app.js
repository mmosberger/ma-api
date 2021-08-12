const express = require("express");
const app = express()
const morgan = require('morgan');


const PORT = 8080

const router = require('./api/routers/test.routes.js')

app.use(router)

app.use(morgan('dev'));

app.use(express.json())

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from ROOOOOT")
})

// http://localhost:8080
app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});

    return;
});