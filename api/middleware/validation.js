const {body} = require("express-validator");
const {validation} = require('../assets/texts.json')

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
    body('start_sleep').exists().withMessage(validation.checkSleep.start_sleep_missing).custom(value => isDate(value)),
    body('end_sleep').exists().withMessage(validation.checkSleep.end_sleep_missing).custom(value => isDate(value))

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


exports.checkTest = [


    body('answers').exists().withMessage(validation.checkTest.answers_missing).isArray().withMessage(validation.checkTest.answers_wrong_value),


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

const isDate = (date) => {

    if ((new Date(date) !== "Invalid Date") && !isNaN(new Date(date))){

        let input_date = new Date(date).getTime();
        let current_date = + new Date();

        if (input_date > current_date) {
            throw new Error("Dein Datum ist in der Zukunkt. Bitte gib ein gültiges Datum an.")
        }

        return true;
    } else {
        throw new Error("Bitte gib ein gültiges Datum mit Zeit an.")
    }

}