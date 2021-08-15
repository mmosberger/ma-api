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
    body('finished').isInt({ min: 0, max: 2 }).withMessage(""),
    body('drugs').isInt({ min: 0, max: 1}).withMessage("Bitte gib an, ob du gestern Abend Alkohol oder Nikotin zu dir genommen hast."),
    body('sleep_quality').isInt({ min: 1, max: 10}).withMessage("Bitte gib auf der Skala von 1-10 an, wie gut du geschlafen hast."),
    body('stress').isInt({ min: 0, max: 1}).withMessage("Bitte gib an, ob du gestern Abend jegliche Art von Stress hattest."),
    body('start_sleep').isDate().withMessage("Bitte gib das Datum und die Uhrzeit an, wann du Schlafen gegangen bist."), //TODO in welchem Format werden die Daten des Schlafes an die API geschickt?
    body('end_sleep').isDate().withMessage("Bitte gib das Datum und die Uhrzeit an, wann du heute Morgen aufgewacht bist"), //TODO Ist das Datum hier nötig?
    test.patchQuestions
)

// finished, sleep_start, sleep_end, sleep_quality, stress, drugs


router.patch('/test/:id',
    body('userInput').isArray(),
    body('time_taken').isInt(), //TODO sollte in sec gesendet werden
    test.updateTest)

//TODO FRage: Werden alle Testantworten auf 1 mal gesendet?
//TODO gute Websiten: https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/ https://github.com/geshan/programming-langugages-api

module.exports = router