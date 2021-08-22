const database = require("../services/database.js");
const {validationResult} = require('express-validator');


exports.getTest = async (req, res) => {


    const id = req.params.id
    let test_data = await database.getTest(id)

    let test_legende = await database.getLegende(test_data[0].id)
    let test_answers = await database.getAnswers(test_data[0].id)


    let legende = [];
    let answers = [];

    for (let legende_icon of test_legende) {
        let obj = {icon_no: legende_icon.icon_no, icon_id: legende_icon.icon_id, id: legende_icon.id}
        legende.push(obj)
    }


    for (let answer of test_answers) {
        let user_input = answer.user_input
        let answer_no = answer.answer_no
        let tableIconId = answer.icons_id
        let symbol_id = answer.icon_id


        let obj = {answer_no: answer_no, icon_id: symbol_id, tableRow: tableIconId, user_input: user_input}
        answers.push(obj)
    }

    let json_file = {
        legende,
        answers
    }

    if (test_data.length < 1) {
        return res.status(404).json({
            errors: [{
                msg: "Es existiert kein Test mit dieser URL, bitte überprüfe deinen Link und versuche es dann erneut."
            }]
        })
    }

    if (test_data[0].finished > 1) {
        return res.status(402).json({
            errors: [{
                msg: "Dieser Test wurde bereits gelöst."
            }],
            legende,
            answers
        })
    }

    if (test_data[0].finished === 1) {
        return res.status(403).json({
            errors: [{
                msg: "Dieser Test wird zurzeit gelöst."
            }]
        })
    }


    if (!test_data[0].sleep_start) {
        return res.status(401).json({
            errors: [{
                msg: "Bitte gib an, wann du schlafen gegangen bist."
            }]
        })
    }

    if (!test_data[0].sleep_end) {
        return res.status(401).json({
            errors: [{
                msg: "Bitte gib an, wann du aufgewacht bist."
            }]
        })
    }

    if (!test_data[0].sleep_quality) {
        return res.status(401).json({
            errors: [{
                msg: "Bitte gib an, wie gut du geschlafen hast."
            }]
        })
    }

    if (test_data[0].drugs == null) {
        return res.status(401).json({
            errors: [{
                msg: "Bitte gib an, ob du gestern Abend Alkohol oder Nikotin zu dir genommen hast"
            }]
        })
    }


    /*for (let answers_icon of test_answers) {
        console.log(answers_icon)
        let icon = legende.find(x => x.id === answers_icon.icons_id).icon_id
        let obj = {answer_no: answers_icon.answer_no, icon_id: icon}
        answers.push(obj)
    }*/


    res.status(200).json(json_file)

    setTimeout(async function(){
        return await database.startTest(id)
    }, 5000);

};

exports.sleepQuestions = async (req, res) => {

    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    let start_date = new Date(req.body["start_sleep"]).getTime()
    let end_date = new Date(req.body["end_sleep"]).getTime()


    if (start_date >= end_date){
        return res.status(400).json({
            errors: [{
                msg: "Deine Aufwachuhrzeit kann nicht vor deiner Einschlafzeit sein."
            }]
        })
    }

    const id = req.params.id
    let test_data = await database.getTest(id)

    let data = req.body;

    if (test_data.length < 1) {
        return res.status(404).json({
            errors: [{
                msg: "Es existiert kein Test mit dieser URL, bitte überprüfe deinen Link und versuche es dann erneut."
            }]
        })
    }
    data.start_sleep = new Date(data.start_sleep)
    data.end_sleep = new Date(data.end_sleep)

    await database.updateTest(data.start_sleep, data.end_sleep, data.sleep_quality, data.drugs, id)


    return res.status(200).json({
        message: "request completed"
    })
};


exports.updateTest = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const id = req.params.id
    let test_data = await database.getTest(id)

    if (test_data.length < 1) {
        return res.status(404).json({
            errors: [{
                msg: "Es existiert kein Test mit dieser URL, bitte überprüfe deinen Link und versuche es dann erneut."
            }]
        })
    }



    const data = req.body;

    for (let answer of data.answers) {
        console.log(answer);

        if (!("user_input" in answer)) {
            return res.status(400).json({
                errors: [{
                    msg: "There is no field for user_input."
                }]
            })
        }

        if (!("icon_id" in answer)) {
            return res.status(400).json({
                errors: [{
                    msg: "There is no field for icon_id."
                }]
            })
        }

        if (!("answer_no" in answer)) {
            return res.status(400).json({
                errors: [{
                    msg: "There is no field for answer_no."
                }]
            })
        }


        await database.UpdateUserAnswers(answer.user_input, answer.icon_id, test_data[0].id, answer.answer_no)
    }

    await database.endTest(id, data.start_date)

    return res.status(200).json({
        message: "request completed"
    })
};