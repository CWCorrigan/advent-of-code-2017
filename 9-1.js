'use strict'
const fs = require('fs');
const os = require('os');

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let stream = data.trim();
    let pointer = 0;
    let score = 0;

    let start = 0;
    let end = 0;

    stream = collectGarbage(stream);

    for(let i = 0; i < stream.length; i++) {
        if(stream[i] === '{' && stream[i-1] != '!') {
            pointer++;
        } else if(stream[i] === '}' && stream[i-1] != '!') {
            score += pointer;
            pointer--;
        }
    }
    console.log(score);
});

function collectGarbage(stream) {
    let garbage = [];
    let pointer = -1;
    let start = 0;
    let end = 0;

    for(let j = 0; j < stream.length; j++) {
        if(stream[j] === '!') {
            j++;
            continue;
        }

        if(stream[j] === '<') {
            if(pointer === -1) {
                start = j;
                pointer += 2;
            } else {
                pointer++;
            }
        } else if(stream[j] === '>') {
            if(pointer != -1) {
                end = j;
                garbage.push([start, end]);
                pointer = -1;
            }
        }
    }
    
    while(garbage.length > 0) {
        let row = garbage.pop();
        stream = stream.substring(0, row[0]) + stream.substring(row[1]+1);
    }
    return stream;
}