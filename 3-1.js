'use strict';

let input = process.argv[2];

function getCoords(n) {
    let root = Math.ceil(Math.sqrt(n));
    let x = 0;
    let y = 0;

    if(root%2 === 0) {
        root++;
    }

    let row = root - (Math.floor(root/2));

    let diff = Math.pow(root, 2) - n;
    let peri = root*4-4;

    x = row-1;
    y = -(row-1);

    while(diff > 0) {
        if(diff/(root*4-4) <= .25) {
            x--;
        } else if(diff/(root*4-4) > .25 && diff/(root*4-4) <= .5) {
            y++;
        } else if(diff/(root*4-4) > .5 && diff/(root*4-4) <= .75) {
            x++;
        } else if(diff/(root*4-4) > .75) {
            y--;
        }
        diff--;
    }

    return [x, y];
}

function calculateDistanceValue(x, y) {
    return Math.abs(x) + Math.abs(y);
}

let coords = getCoords(input);

console.log(calculateDistanceValue(...coords));
