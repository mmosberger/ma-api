/**
 *Description of test.routers.js
 *@author Michel Mosberger
 *@version 1.0
 *@since 12.08.2021
 */

const express = require('express')
const router = express.Router()

const database = require('../services/database.js')

router.get('/test/:id', async (req, res) => {
    console.log("Fetching test with id: " + req.params.id)

    const testID = req.params.id
    let message;

    const queryString = "SELECT * FROM test WHERE url = ?"
    const queryValue = [testID]
    let test_data = await database.query(queryString, queryValue);

    if (test_data.length < 1) {
        message = {message: "Es existiert kein Test mit dieser URL, bitte überprüfe deinen Link und versuche es dann erneut."}
        return res.status(404).json(message)
    }

    if (test_data[0].finished === 1){
        message = {message: "Dieser Test wurde bereits gelöst."}
        return res.status(403).json(message)
    }


    if (!test_data[0].sleep_duration){
        message = {message: "Bitte gib an, wie viel du geschlafen hast."}
        return res.status(401).json(message)
    }

    const queryLegendeString = "SELECT * FROM icons WHERE test_id = ?"
    const queryLegendeValue = [test_data[0].id]
    const queryAnswersString = "SELECT * FROM answers WHERE test_id = ?"

    let test_legende = await database.query(queryLegendeString, queryLegendeValue);
    let test_answers = await database.query(queryAnswersString, queryLegendeValue);

    let legende = [];
    let answers = [];

    for (let legende_icon of test_legende){
        let obj = {icon_no: legende_icon.icon_no, icon_id: legende_icon.icon_id}
        legende.push(obj)
    }

    for (let answers_icon of test_answers){
        let obj = {answer_no: answers_icon.answer_no, icon_id: answers_icon.icon_id}
        answers.push(obj)
    }

    let json_file = {
        legende,
        answers
    }


    res.status(200).json(json_file)
    //TODO gute Websiten: https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/ https://github.com/geshan/programming-langugages-api
})

module.exports = router