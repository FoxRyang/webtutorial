var testFolder = './data/';
var fs = require('fs');

var dataList;
fs.readdir(testFolder, function (error, filelist) {
    console.log(filelist);
    dataList = filelist;
})

export default function GetDatas() {
    return dataList;
}