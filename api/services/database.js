const mysql = require("mysql");
require('dotenv').config();

class Database {
    static query = async (string, values) => {
        let pool = mysql.createConnection(
            {
                host: "127.0.0.1",
                user: "mmosberger",
                password: "ma-projekt-db",
                database: "maturaarbeit"
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

    static initTest = async(url, date) => {
        let queryString = 'UPDATE test SET start_date =? WHERE url =?'
        let queryValues = [new Date(), url];

        return await this.query(queryString, queryValues);
    }

    static startTest = async(url) => {
        let queryString = 'UPDATE test SET finished=? WHERE url =?'
        let queryValues = ['1', url];

        return await this.query(queryString, queryValues);
    }

    static getLegende = async (testID) => {

        const queryString = "SELECT * FROM icons WHERE test_id =?"
        const queryValue = [testID]

        return await this.query(queryString, queryValue)
    }

    static getAnswers = async (testID) => {

        const queryString = 'SELECT * FROM answers INNER JOIN icons ON answers.icons_id = icons.id WHERE answers.test_id = ? ORDER BY answer_no'
        const queryValue = [testID]

        return await this.query(queryString, queryValue)
    }

    static UpdateUserAnswers = async (user_input, icon_id, test_id, answer_no) => {
        const queryString = 'UPDATE answers SET user_input =? WHERE answer_no =? AND icons_id =? AND test_id =?';
        const queryValues = [user_input, answer_no, icon_id, test_id];

        return await this.query(queryString, queryValues)
    }

    static endTest = async (url) => {
        let queryString = 'UPDATE test SET finished =?, complete_date =? WHERE url =?'
        let queryValues = ["2", new Date(), url];

        return await this.query(queryString, queryValues);
    }

    static checkTests = async () => {
        let queryString = 'SELECT * FROM test'

        return await this.query(queryString, [])
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