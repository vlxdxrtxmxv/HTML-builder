
const {createReadStream, createWriteStream} = require('fs');
const {rm, readdir} = require('fs/promises');
const path = require('path');

let filename = __dirname + '\\styles';
let filenameCopy = __dirname + '\\project-dist' + '\\bundle.css';
let stylesCurrent = path.join(filename);
let bundleCopy = path.join(filenameCopy);

async function bundleStyles(style, bundle) {
    await rm(bundle, {force: true});

    let fileCSS = (await readdir(style)).filter(file => path.extname(path.join(style, file)) === '.css');

        fileCSS.forEach(file => {

            let readCSS = createReadStream(path.join(style, file), 'utf-8');

            readCSS.pipe(createWriteStream(bundle, {flags: 'a'}));
        });
    }
bundleStyles(stylesCurrent,bundleCopy);
console.log('File bundle.css created successfully!')