'use strict'
const fs = require('fs');
const os = require('os');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let instructs = data.trim().split(',');

    let list = Array.from(Array(256).keys());
    let currentPos = 0;
    let skip = 0;

    for(let i = 0; i < instructs.length; i++) {
        let instruct = instructs[i];
        let slice = list.slice(currentPos, (currentPos+instruct)).reverse();

        list.splice(currentPos, slice.length, ...slice);

        currentPos = slice.length + skip;
        if(currentPos > 255) {
            currentPos = currentPos - 256;
        }
        skip++;
    }
});