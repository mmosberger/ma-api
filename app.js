const express = require("express");
const app = express()
const morgan = require('morgan');
const bodyParser = require("body-parser");

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })



const PORT = parseInt(process.env.PORT, 10) || 8080;

const router = require('./api/routers/test.routes.js')

app.use(morgan('dev'));

app.use(urlencodedParser)

app.use(jsonParser)

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

app.use(router)
