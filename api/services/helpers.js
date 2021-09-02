const database = require("./database");

exports.checkCancelledTests = async() => {


    setInterval(async function(){

        let exisitingTests = await database.checkTests()

        if (exisitingTests.length > 0){
            let tests = await database.checkCancelledTests()

            for (let test of tests) {

                let start_timestamp = parseInt((new Date(test.start_date).getTime() / 1000).toFixed(0));
                let current_timestamp = parseInt((new Date() / 1000).toFixed(0));



                if (current_timestamp - start_timestamp >360){ // 6 minutes
                    console.log("reset test " + test.url)
                    return await database.resetTest(test.url);
                }
            }
        }


    }, 60 * 1000);

}