const https = require('https');
const fs = require('fs');

const cookie = 'session=53616c7465645f5f8a63495e343be1f01414c1e0e28bd30e1fb90fc7590537650e8edf598879c094ac63a2f424f81bf8;'
let options =  {
  path: 'https://adventofcode.com/2017/day/7/input',
  headers: {
    'Cookie': cookie,
  }
}

https.get(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  
  }).on('error', (e) => {
    console.error(e);
});