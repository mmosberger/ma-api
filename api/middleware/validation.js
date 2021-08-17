const {body} = require("express-validator");
const { validation } = require('../assets/texts.json')

exports.checkSleep = [


        body('drugs').exists().withMessage(validation.checkSleep.drugs_missing).isInt({
            min: 0,
            max: 1
        }).withMessage(validation.checkSleep.drugs_wrong_value),
        body('sleep_quality').exists().withMessage(validation.checkSleep.sleep_quality_missing).isInt({
            min: 1,
            max: 10
        }).withMessage(validation.checkSleep.sleep_quality_missing),
        /*body('stress').exists().withMessage(validation.checkSleep.stress_missing).isInt({
            min: 0,
            max: 1
        }).withMessage(validation.checkSleep.stress_wrong_value),*/
        body('start_sleep').exists().withMessage(validation.checkSleep.start_sleep_missing).isDate().withMessage(validation.checkSleep.start_sleep_wrong_value),
        body('end_sleep').exists().withMessage(validation.checkSleep.end_sleep_missing).isDate().withMessage(validation.checkSleep.end_sleep_wrong_value)


    ]


exports.checkTest = [


        body('finished').exists().withMessage(validation.checkSleep.finished_missing).isInt({
            min: 0,
            max: 2
        }).withMessage(validation.checkSleep.finished_wrong_value),
        body('userInput').exists().withMessage(validation.checkTest.user_input_missing).isArray().withMessage(validation.checkTest.user_input_wrong_value), //TODO wie kann man überprüfen, ob diese Values im array drin existieren
        body('time_taken').exists().withMessage(validation.checkTest.time_taken_missing).isInt().withMessage(validation.checkTest.time_taken_wrong_value)


    ]