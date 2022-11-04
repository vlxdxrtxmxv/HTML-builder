const {stat} = require("fs");
const path = require("path");
const {readdir} = require("fs/promises")

let filename = __dirname + '\\secret-folder';
let way = path.join(filename);

readdir(way, {withFileTypes: true},).then(data=> data.forEach(files=>{
    let curWay = path.join(way, files.name);

    if(files.isFile()){
        stat(curWay , (err, stats) => {
            if(stats){
                let fileName = files.name.split('.')[0];
                let extna = (path.extname(curWay)).slice(1);
                let siZe = (stats.size/1024).toFixed(3);
                return console.log(`${fileName} - ${extna} - ${siZe}kb`);
            }
             else{
          return console.log(err.message);
        }
        })
       
    }
}));