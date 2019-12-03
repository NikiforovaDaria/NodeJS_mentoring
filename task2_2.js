const fs = require("fs");
const csvFile = require("csv-parser");
const { pipeline } = require("stream");

const txt = fs.createWriteStream("task2_2.txt");

const csvStream = csvFile();
csvStream
    .on("data", function (data) {
        txt.write(JSON.stringify(data) + "\n");
    })
    .on("end", function () {
        console.log("done");
    })
    .on("error", function (error) {
        console.log(error);
    });

pipeline(
    fs.createReadStream("./node_mentoring_t1_2_input_example.csv"),
    csvStream,
    err => {
        if (err) {
            console.error("Pipeline failed.", err);
        } else {
            console.log("Pipeline succeeded.");
        }
    }
);