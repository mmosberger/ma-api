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

    static updateTest = async (sleep_start, sleep_end, sleep_quality, drugs, url) => {
        const queryString = "UPDATE test set sleep_start =?, sleep_end =?, sleep_quality =?, drugs =? WHERE url =?"
        const queryValues = [sleep_start, sleep_end, sleep_quality, drugs, url]

        return await this.query(queryString, queryValues)
    }

    static startTest = async(url) => {
        let queryString = 'UPDATE test SET finished =?, start_date =? WHERE url =?'
        let queryValues = ["1", new Date(), url];

        return await this.query(queryString, queryValues);
    }

    static getLegende = async (testID) => {

        const queryString = "SELECT * FROM icons WHERE test_id =?"
        const queryValue = [testID]

        return await this.query(queryString, queryValue)
    }

    static getAnswers = async (testID) => {

        const queryString = "SELECT * FROM answers WHERE test_id =?"
        const queryValue = [testID]

        return await this.query(queryString, queryValue)
    }

    static UpdateUserAnswers = async (user_input, icon_id, test_id, answer_no) => {
        const queryString = 'UPDATE answers SET user_input =? WHERE answer_no =? AND icons_id =? AND test_id =?';
        const queryValues = [user_input, answer_no, icon_id, test_id];

        //todo wie macht man das, wenn der user es nicht eingefüllt hat, dann ist es ja NULL und das kann man in queryValues nicht eifügen
        return await this.query(queryString, queryValues)
    }

    static endTest = async (url, time_taken) => {
        let queryString = 'UPDATE test SET finished =?, complete_date =?, time_taken =? WHERE url =?'
        let queryValues = ["2", new Date(), time_taken, url];

        return await this.query(queryString, queryValues);
    }


    static checkCancelledTests = async () => {
        let queryString = 'SELECT * FROM test WHERE finished =? AND start_date IS NOT NULL'
        let queryValue = [1] //In Progress

        return await this.query(queryString, queryValue)
    }

    static resetTest = async (url) => {
        let queryString = 'UPDATE test SET finished =?, start_date = ?, sleep_quality =?, sleep_start =?, sleep_end =?, drugs =? WHERE url =?'
        let queryValues = ['0', null, null, null, null, null, url]

        return await this.query(queryString, queryValues)
    }
}


module.exports = Database;