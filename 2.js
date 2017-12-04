'use strict'
const fs = require('fs');
let input;

if(process.argv.includes("-f")) {
    let index = process.argv.findIndex((element) => {
        if(element === "-f") {
            return element;
        }
    });

    let file = process.argv[index+1];

    input = fs.readFile(file, 'utf-8', (err, data) =>{
        if(err) {
            if(err.code === 'ENOENT') {
                console.error('File does not exist!');
                return;
            }
            throw err;
        } else {
            calculateFactors(data);
        }
    });
}

function calculateHash(file) {
    let rows = file.split("\n");
    let resultSet = [];
    rows.forEach((me, index) => {
        let nums = me.split(/\s/).map(Number);
        let high = Math.max(...nums);
        let low = Math.min(...nums);

        resultSet.push(high-low);
    });
    let result = resultSet.reduce((prev, curr) => {
        return curr + prev;
    });

    console.log(result);
}

function calculateFactors(file) {
    let rows = file.split("\n");
    let resultSet = [];

    rows.forEach((me, index) => {
        let nums = me.split(/\s/).map(Number);
        let divisor;
        let dividend;

        for(let i = 0; i < nums.length; i++) {
            dividend = nums[i];

            for(let j = 0; j < nums.length; j++) {
                divisor = nums[j];

                if(dividend%divisor != 0 || i === j) {
                    continue;
                } else {             
                    resultSet.push(dividend/divisor);
                }
            }
        }
    });

    let result = resultSet.reduce((prev, curr) => {
        return curr + prev;
    })

    console.log(result);
}