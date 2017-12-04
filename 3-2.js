let input = process.argv[2];

//Ensure the grid is big enough to find the number we're looking for
let width = Math.ceil(Math.sqrt(input));

// Establish an array so that keys exist
let size = width*2-1;
let matrix = [];

for(let i = 0; i < size; i++) {
    matrix[i] = [];
    for(let j = 0; j < size; j++) {
        matrix[i][j] = 0;
    }
}

// Middle of the board will be the size-1
let x = width-1;
let y = width-1;

// The number of times you process a direction change every 2 times. First 2 are 1 second 2 are 2 etc.
let runs = 1;

// Directions are mapped to array keys 0-3
let dir = 0;

// Movement directions
let d = [
    {x: 1, y: 0}, //Right
    {x: 0, y: -1}, //Up
    {x: -1, y: 0}, //Left
    {x: 0, y: 1} //Down
]

//Loop until we find something, using for just for conciseness of the initialization/iteration of the counter
for(let i = 1; i < Infinity; i++) {
    for(let j = 0; j < runs; j++) {
        if(i == 1) {
            matrix[y][x] = 1;
        } else {
            matrix[y][x] = matrix[y+1][x] + matrix[y-1][x] + matrix[y][x+1] + matrix[y][x-1] + matrix[y-1][x-1] + matrix[y+1][x+1] + matrix[y+1][x-1] + matrix[y-1][x+1];
        }
        if(matrix[y][x] > input) {
            break;
        }
        x = x+d[dir].x;
        y = y+d[dir].y;
    }

    if(matrix[y][x] > input) {
        console.log(matrix[y][x]);
        break;
    }

    dir === 3 ? dir = 0 : dir++;
    
    if(i%2 == 0) {
        runs++;
    }
}