let types = require("../utility");
let fs = require("fs");
let path = require("path");

function organizefn(dirPath) {
    // return `organize command implemented `;
    // 1. input -> directory path given
    let destPath;
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
    }else{
        let doestExist = fs.existsSync(dirPath);
        if(doestExist){

            // 2. create -> organized_files -> directory
            destPath = path.join(dirPath, "organized_files");
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }

        }else {
            console.log("kindly enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
    // 3. Identify categories of all the files present in that input directory ->
}
function organizeHelper(src, dest){
    // 3. Identify categories of all the files present in that input directory ->
    let childNames = fs.readdirSync(src);
    for(let i = 0; i < childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to -->", category);
            // 4. copy / cut files to organized directory inside of any of category folder
            sendFiles(childAddress, dest, category);
        }
    }
}
function sendFiles(srcFilePath, dest, category){
    let categorypath = path.join(dest, category);
    if(!(fs.existsSync(categorypath))){
        fs.mkdirSync(categorypath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categorypath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    // fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to", category);
}
function getCategory(name){
    let ext = path.extname(name);
    ext = ext.substring(1);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i = 0; i < cTypeArray.length; i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
        return "others";
    }
}

module.exports = {
    organizeKey: organizefn
}