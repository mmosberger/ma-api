/**
 *Description of test.routers.js
 *@author Michel Mosberger
 *@version 1.0
 *@since 12.08.2021
 */

const router = require('express').Router()
const {body} = require('express-validator');


const test = require("../controllers/test.controller.js")

router.get('/test/:id', test.getTest)

router.patch('/test/:id/sleep',
    body('finished').isInt().custom((value) => {
        if (!0 <= value <= 2) {
            throw new Error('Finished must be an integer 0 <= x <= 2 ')
        }
        return true;
    }),
    body('drugs').isInt().custom((value) => {
        if (!0 <= value <= 1) {
            throw new Error('Drugs must be an Integer 0 <= x <= 1')
        }
        return true;
    }),
    body('sleep_quality').isInt().custom((value) => {
        if (!10 >= value >= 1) {
            throw new Error('Sleep Quality must be an Integer 1 <= x >= 10')
        }
        return true;
    }),
    body('stress').isInt().custom((value) => {
        if (!0 <= value <= 1) {
            throw new Error('Stress must be an Integer 0 <= x <= 1')
        }
        return true;
    }),
    body('start_sleep').isDate(), //TODO Wie soll das Datum an die API geschickt werden? format
    body('end_sleep').isDate(),
    test.patchQuestions
)

// finished, sleep_start, sleep_end, sleep_quality, stress, drugs


router.patch('/test/:id', test.updateTest)

//TODO gute Websiten: https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/ https://github.com/geshan/programming-langugages-api

module.exports = router