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
            parsePassphrase(data);
        }
    });
}

function parsePassphrase(s) {
    let passwords = s.split('\n');
    let valid = [];

    valid = passwords.filter((me) => {
        let a = me.split(' ');
        let unique = [...new Set(a)].length;

        if(unique != a.length || me === '') {
            return false;
        } else {
            console.log(me);
            return true;
        }
    });
    console.log(valid.length);
}