'use strict';

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
            reallocateData(data);
        }
    });
}

function reallocateData(input) {
    let registers = input.trim().split(/\s/).map(Number);
    let occured = [];
    let notInfinite = true;
    let count = 0;

    while(notInfinite) {
        occured.push(registers.join(''));
        
        let highest = Math.max(...registers);
        let ind = registers.indexOf(highest);

        registers[ind] = 0;

        while(highest > 0) {
            ind++;

            if(ind == registers.length) {
                ind = 0;
            }
            registers[ind]++;
            highest--;
        }

        if(occured.includes(registers.join(''))) {
            notInfinite = false;
        }

        count++;
    }
    console.log(count);
}