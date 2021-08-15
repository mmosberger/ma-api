const mysql = require("mysql");
require('dotenv').config();

class Database {
    static query = async (string, values) => {
        let pool = mysql.createConnection(
            {
                host: "127.0.0.1",
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE
            }
        );

        pool.connect(function (err) {
            if (err) {
                console.log("Unable to connect to the MySQL database." + err);
            }
        });

        return new Promise((resolve, reject) => {
            pool.query(string, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });

            pool.end();

        });
    }

    static getTest = async (url) => {

        const queryString = "SELECT * FROM test WHERE url = ?"
        const queryValue = [url]

        return await this.query(queryString, queryValue)
    }

    static getAnswers = async (testID) => {

        const queryString = "SELECT * FROM answer WHERE test_id = ?"
        const queryValue = [testID]

        return await this.query(queryString, queryValue)
    }

    static getLegende = async (testID) => {

        const queryString = "SELECT * FROM icons WHERE test_id = ?"
        const queryValue = [testID]

        return await this.query(queryString, queryValue)
    }

    static updateTest = async (complete_date, finished, time_taken, sleep_duration, sleep_quality, stress, url) => {
        const queryString = "UPDATE test set complete_date = CURRENT_TIMESTAMP, finished=?, time_taken=?, sleep_duration=?, sleep_quality=?, stress=? WHERE url =?"
        const queryValues = [complete_date, finished, time_taken, sleep_duration, sleep_quality, stress, url]

        return await this.query(queryString, queryValues)
    }

    static UpdateUserAnswers = async (testID, answers) => {
        //TODO wie will das gemacht werden? WEnn man ja nach test_id, antworten, symbol und user input filtert gibt es immer noch mehrere Rows und des weiteren müsste doch jedes einzeln updated werden, also 100 db requests.
    }
}


module.exports = Database;