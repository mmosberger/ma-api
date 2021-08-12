/**
 *Description of test.js
 *@author Michel Mosberger
 *@version 1.0
 *@since 12.08.2021
 */

const express = require('express')
const router = express.Router()

const database = require('../database.js')

router.get('/test/:id', async (req, res) => {
    console.log("Fetching test with id: " + req.params.id)

    const testID = req.params.id

    const queryString = "SELECT * FROM test WHERE url = ?"
    const queryValue = [testID]
    let test_data = await database.query(queryString, queryValue);

    if (test_data.length < 1){
        res.status(404).send("No url found")
    }



    /*if (error) {
        console.log("Failed to query for tests: " + err)
        res.sendStatus(500)
        return
        // throw err
    }*/

    console.log("I think we fetched tests successfully")

    const test_send = {firstName: test_data[0].create_date, lastName: test_data[0].finished}


    res.json(test_send)
})

module.exports = router