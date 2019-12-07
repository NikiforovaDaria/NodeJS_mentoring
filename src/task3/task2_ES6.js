import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const readStream = fs.createReadStream('./node_mentoring_t1_2_input_example.csv');
const writeStream = fs.createWriteStream('task2_2.txt');

pipeline(
    readStream,
    csv(),
    writeStream,
    err => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);