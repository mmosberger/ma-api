/**
 *Description of test.routers.js
 *@author Michel Mosberger
 *@version 1.0
 *@since 12.08.2021
 */

const express = require('express')
const router = express.Router()

const testcontroller = require("../controllers/test.controller.js")

router.get('/test/:id', testcontroller.getTest )

    //TODO gute Websiten: https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/ https://github.com/geshan/programming-langugages-api

module.exports = router