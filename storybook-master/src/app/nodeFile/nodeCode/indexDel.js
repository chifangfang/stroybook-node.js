var readline = require('readline');
var fs = require('fs');
var index = [];

var fsIndex = fs.createReadStream('../../baseComponents/index.jsx');  //返回一个readStream（文件读取流，输入流）对象
//逐行读写
var indexLine = readline.createInterface({
    input: fsIndex,
});
index.push('baseComponentsFile');
indexLine.on("close", () => {
    index.splice(0,1);
    if(index.length===0){
    }
})
//逐步读取baseContent文件里的内容
indexLine.on('line', (line) => {
    if((!(line == ''))&&(!(line.indexOf('// ') > -1))){
        fs.appendFile('./1.txt',line+'\n')
    }
});