const database = require("../services/database.js");
const {validationResult} = require('express-validator');


exports.getTest = async (req, res) => {


    const id = req.params.id
    let test_data = await database.getTest(id)

    if (test_data.length < 1) {
        return res.status(404).json({
            message: "Es existiert kein Test mit dieser URL, bitte überprüfe deinen Link und versuche es dann erneut."
        })
    }

    if (test_data[0].finished > 0) {
        return res.status(403).json({
            message: "Dieser Test wurde bereits gelöst."
        })
    }

    if (test_data[0].finished === 1) {
        return res.status(403).json({
            message: "Dieser Test wird zurzeit gelöst."
        })
    }


    if (!test_data[0].sleep_duration) {
        return res.status(401).json({
            message: "Bitte gib an, wie viel du geschlafen hast."
        })
    }

    if (!test_data[0].sleep_quality) {
        return res.status(401).json({
            message: "Bitte gib an, wie gut du geschlafen hast."
        })
    }

    if (!test_data[0].stress) {
        return res.status(401).json({
          message: "Bitte gib an, ob du letzthin Stress hattest."
        })
    }



    let test_legende = await database.getLegende(test_data.id)
    let test_answers = await database.getAnswers(test_data.id)

    let legende = [];
    let answers = [];

    for (let legende_icon of test_legende) {
        let obj = {icon_no: legende_icon.icon_no, icon_id: legende_icon.icon_id}
        legende.push(obj)
    }

    for (let answers_icon of test_answers) {
        let obj = {answer_no: answers_icon.answer_no, icon_id: answers_icon.icon_id}
        answers.push(obj)
    }

    let json_file = {
        legende,
        answers
    }

    res.status(200).json(json_file)

};

exports.patchQuestions = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    res.status(200).json({
        data: req.body
    })
    console.log(validationResult)
};

exports.updateTest = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = req.body;
    //if(!complete_date) // TODO Array validieren


    res.status(200).json({
        data: req.body
    })
    console.log(data)
};