const {body} = require("express-validator");
const {validation} = require('../assets/texts.json')
const moment = require("moment");

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
    body('start_sleep').exists().withMessage(validation.checkSleep.start_sleep_missing).custom(isValidDate).withMessage(validation.checkSleep.start_sleep_wrong_value),
    body('end_sleep').exists().withMessage(validation.checkSleep.end_sleep_missing).custom(isValidDate).withMessage(validation.checkSleep.end_sleep_wrong_value)

    /*
    Query Example:
    {
    "drugs": "1",
    "sleep_quality": "10",
    "start_sleep": "2021-08-15 22:30:40",
    "end_sleep": "2021-08-16 06:30:20"
    }
     */

]

function isValidDate(value) {
    return moment(value).isValid();
}


exports.checkTest = [


    /*
    body('finished').exists().withMessage(validation.checkSleep.finished_missing).isInt({
        min: 0,
        max: 2
    }).withMessage(validation.checkSleep.finished_wrong_value),
    Wird automatisch von der API gemacht
    */
    body('answers').exists().withMessage(validation.checkTest.answers_missing).isArray().withMessage(validation.checkTest.answers_wrong_value), //TODO wie kann man überprüfen, ob diese Values im array drin existieren
    body('time_taken').exists().withMessage(validation.checkTest.time_taken_missing).isInt().withMessage(validation.checkTest.time_taken_wrong_value)


    /*
    Query Example:
    {
    "answers": [{
        "icon_id": "3",
        "user_input": "5"
    }],
    "time_taken": "90"
    }
 */
]