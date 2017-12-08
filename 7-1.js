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
            findBase(data);
        }
    });
}

function findBase(input) {
    let bases = input.split('\n').filter((me) => {
        return me.includes('->');
    });

    let subbases = bases.map((me) => {
        return me.split(/\s/).splice('3').join();
    });

    let notBase = subbases.map((me) => {
        return me.split(',').filter((me) => {
            if(me === '') {
                return false;
            } else {
                return true;
            }
        });
    });

    notBase = notBase.join();

    bases.forEach((me) => {
        if(!notBase.includes(me.split(/\s/)[0])) {
            console.log(me);
        }
    });
}