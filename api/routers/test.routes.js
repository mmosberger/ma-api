/**
 *Description of test.routers.js
 *@author Michel Mosberger
 *@version 1.0
 *@since 12.08.2021
 */

const router = require('express').Router()


const test = require("../controllers/test.controller.js")

router.get('/test/:id', test.getTest)

router.patch('/test/:id', test.updateTest)

    //TODO gute Websiten: https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/ https://github.com/geshan/programming-langugages-api

module.exports = router