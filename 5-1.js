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
            traverseList(data);
        }
    });
}

function traverseList(input) {
    let map = input.split('\n').map(Number);
    let ind = 0;
    let count = -1; // First loop doesn't count as a step as that is where we're starting

    let escape = false;
    while(escape == false) {
        if(map[ind] === undefined) {
            escape = true;
        }

        let cVal = map[ind];
        map[ind]++;
        ind += cVal;
        count++;
    }
    console.log(count);
}