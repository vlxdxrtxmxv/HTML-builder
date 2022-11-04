const fs = require('fs');
const path = require('path');

let filename = __dirname + '\\text.txt';
let way = path.join(filename);
let reader = fs.createReadStream(way, 'utf-8');

let data = '';
reader.on('data', function (chunk) {
    console.log(chunk += data);
});

reader.on('error', function (error) {
    console.log(error.message);
});