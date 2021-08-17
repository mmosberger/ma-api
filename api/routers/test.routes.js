/**
 *Description of test.routers.js
 *@author Michel Mosberger
 *@version 1.0
 *@since 12.08.2021
 */

const router  = require('express').Router()


const test = require("../controllers/test.controller.js")
const {checkSleep, checkTest} = require("../middleware/validation");

router.get('/test/:id', test.getTest)

router.patch('/test/:id/sleep', checkSleep, test.sleepQuestions)

router.patch('/test/:id', checkTest, test.updateTest)


module.exports = router