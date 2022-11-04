const fs = require("fs");
const path = require("path");
const process = require("process");

let filename = __dirname + "\\text.txt";
let way = path.join(filename);
let out = fs.createWriteStream(way, "utf-8");

process.on('SIGINT', function(){

process.exit();

}

)
process.stdout.write('\nПривет!\n');

process.stdin.on('data', function(text){
    text.toString().toLowerCase().trim() === 'exit' ? process.exit() : out.write(text);
})

process.on('exit', function(){
process.stdout.write("The file has already created!");
})

out.on('error', function (error) {
    console.log(error.message);
    process.exit();
});
