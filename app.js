const express = require("express");
const app = express()
const morgan = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors")

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })



const PORT = parseInt(process.env.PORT, 10) || 8080;

const router = require('./api/routers/test.routes.js');
const helpers = require('./api/services/helpers.js');

app.use(cors())

app.use(morgan('dev'));

app.use(urlencodedParser);

app.use(jsonParser);

app.get("/", (req, res) => {
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
    return res.status(statusCode).json({'message': err.message});
});

app.use(router)

helpers.checkCancelledTests()