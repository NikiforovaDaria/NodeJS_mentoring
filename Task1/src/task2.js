const fs = require('fs');
const csvToJson = require('csvtojson/v2');

const csvFilePath = "Task1/node_mentoring_t1_2_input_example.csv";

csvToJson()
    .fromFile(csvFilePath)
    .then(jsonArr => {
        fs.writeFile(
            "Task1/task2.txt",
            jsonArr.map(jsonStr => JSON.stringify(jsonStr)).join("\n"),
            err => {
                if (err) throw err;
                console.log("The file has been saved!");
            }
        );
    });