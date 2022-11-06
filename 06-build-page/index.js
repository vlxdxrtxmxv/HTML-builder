const fs = require('fs');
const {mkdir, readdir, unlink, readFile} = require('fs/promises');
const path = require('path');

let filename = __dirname;
let filenameProject = __dirname + '\\project-dist';
let currentProject = path.join(filename);
let newProject = path.join(filenameProject);

/*=====================================================================
               Project HTML-builder create Folder Assets
=====================================================================*/
async function createFolder(newProject) {
    try {
        await mkdir(newProject, {recursive: true});
        createStyle(currentProject, '/styles/');
        createHTML(currentProject, '/components/');
    }

    catch (error) {
        if (error) {
            return console.log(error.message);
        }
    }
}

function copyFolder(currentProject, newProject, folder) {

    currentProject += folder;
    newProject += folder;

    createDir(currentProject, newProject);

    async function createDir(currentProject, newProject) {
        try {
            function deleteFiles(newProject) {
                    if (filename.isDirectory()) {
                        deleteFiles(path.join(newProject, filename.name));
                    } else {
                        unlink(path.join(newProject, filename.name));
                    }
                }
        }
        catch (error) {
            if (error) {
                return console.log(error.message);
            }
        }
        copyDir(currentProject, newProject);
    }

    function copyDir(currentProject, newProject) {
        fs.mkdir(newProject, {recursive: true}, function (error) {
            if (error) {
                return console.log(error.message);
            }
        });

        fs.readdir(currentProject, {withFileTypes: true}, (error, fileBuffer) => {
            fileBuffer.forEach(filename => {

                let src = path.join(currentProject, filename.name);
                let duplicate = path.join(newProject, filename.name);

                if (filename.isDirectory()) {
                    copyDir(src, duplicate, function (error) {
                        if (error) {
                            return console.log(error.message);
                        }
                    });
                } else {
                    fs.copyFile(src, duplicate, function (error) {
                        if (error) {
                            return console.log(error.message);
                        }
                    });
                }
            });
        });
    }
}

/*=====================================================================
               Project HTML-builder create styles
=====================================================================*/
async function createStyle (currentProject, folder) {
    currentProject += folder;

    let data = '';

    for (let filename of await readdir(currentProject)) {
        if (path.parse(currentProject + filename).ext === '.css') {
            data += await readFile(currentProject + filename, 'utf8');
        }
    }
    bundle(data);

    function bundle(data) {
        fs.createWriteStream(newProject + "/style.css").write(data, 'UTF8');
        fs.createWriteStream(newProject + "/style.css").end();
    }
}

/*=====================================================================
               Project HTML-builder create html
=====================================================================*/
async function createHTML(currentProject, folder) {

    let temp = await readFile(currentProject + '/template.html', 'utf8');

    for (let filename of await readdir(currentProject + folder)) {
        if (path.parse(currentProject + folder + filename).ext === '.html') {

            let readHTMLStream = await readFile(currentProject + folder + filename, 'utf8');
            let regExpHTML = new RegExp(`{{${path.parse(currentProject + folder + filename).name}}}`);

            temp = temp.replace(regExpHTML, readHTMLStream);
        }
    }

    writeTemplate(temp);

    function writeTemplate(temp) {
        fs.createWriteStream(newProject + "/index.html").write(temp, "UTF8");
        fs.createWriteStream(newProject + "/index.html").end();
    }
}

createFolder(newProject);
copyFolder(currentProject, newProject, '/assets/');
console.log('Assembly of the HTML-page from components and styles completed successfully!');