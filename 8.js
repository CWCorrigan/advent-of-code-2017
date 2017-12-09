'use strict'
const fs = require('fs');
const os = require('os');

const REG = 0;
const OP = 1;
const VAL = 2;
const LCOMP = 4;
const COMP = 5;
const RCOMP = 6;

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    let instructs = data.trim().split(os.EOL);    

    let registers = [];
    let highest = -Infinity;

    instructs = instructs.map((me) => {
        registers[me.split(' ')[0]] = 0;
        return me.split(' ');
    });

    while(instructs.length > 0) {
        let instruct = instructs.shift();

        let register = instruct[REG];
        let operation = instruct[OP];
        let value = parseInt(instruct[VAL]);

        let evalString = 'registers[\'' + instruct[LCOMP] + '\'] ' + instruct[COMP] + ' ' + instruct[RCOMP];

        if(eval(evalString)) {
            operation == 'inc' ? registers[register] += value : registers[register] -= value;     
        }

        if(registers[register] > highest) {
            highest = registers[register];
        }
    }

    console.log('Part 1: ' + Math.max(...Object.values(registers)));
    console.log('Part 2: ' + highest);
});