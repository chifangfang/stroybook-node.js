var readline = require('readline');
var fs = require('fs');
var os = require('os');
let onStart = false;
var readobjlist = [];

//查找jsx文件内容是否有propTypes，有则创建文件，把内容追加进去
function writeJsxFile(dir, item) {
    var fileJsx = dir + item;
    var fReadName = fileJsx;
    var fRead = fs.createReadStream(fReadName);  //返回一个readStream（文件读取流，输入流）对象
    //逐行读写
    var objReadline = readline.createInterface({
        input: fRead,
    });
    readobjlist.push(objReadline);
    objReadline.on("close", () => {
        readobjlist.splice(0,1);
        if(readobjlist.length===0){
            basefile('../document/')
        }
    })
    
    if (item.indexOf('.jsx') > 0) {
        var baseFile = '../document/' + `${item}`;
        if (fs.existsSync(baseFile)) {
            fs.unlinkSync(`${baseFile}`);
        }
        objReadline.on('line', (line) => {
            var propTypes = 'propTypes'
            var PropTypes = 'PropTypes.'
            var reg1 = '}'

            if (line.indexOf(propTypes) >= 0 || line.indexOf(PropTypes) >= 0 || onStart) {
                if(line.indexOf('{') >=0){
                    fs.appendFileSync("../document/" + `${item}`, '<p>static propTypes=('+'</p>'+ '\n');//异步地追加数据到一个文件，如果文件不存在则创建文件
                }
                else if(line.indexOf('}') >=0){
                    fs.appendFileSync("../document/" + `${item}`, '<p>)'+'</p>'+ '\n');//异步地追加数据到一个文件，如果文件不存在则创建文件
                }
                else{
                    fs.appendFileSync("../document/" + `${item}`, '<p>'+line +'</p>'+ '\n');//异步地追加数据到一个文件，如果文件不存在则创建文件
                }
            }
            if (line.indexOf(reg1) >= 0) {
                onStart = false
            }
            if (!onStart && line.indexOf(propTypes) >= 0 || line.indexOf(PropTypes) >= 0) {
                onStart = true
            }
        });
    } else if (item.indexOf('.tsx') > 0) {
        var baseFile = '../document/' + `${item}`;
        if (fs.existsSync(baseFile)) {
            fs.unlinkSync(`${baseFile}`);
        }
        let onStart = false
        var index = 1;
        objReadline.on('line', (line) => {
            var reg = 'interface'
            if (line.indexOf(reg) >= 0) {

                line = line.split('{');
                line[1]=line[1].substring(0,line[1].length - 1)
                line = '<p>'+line[0] + ': (' + line[1]+')'+'</p>';
                line = line.replace(/;/g, ",")
                fs.appendFileSync("../document/" + `${item}`, line + '\n');
                // fWrite.write(tmp + os.EOL); // 下一行
            }
            if (onStart && line.indexOf(reg) >= 0) {
                onStart = false
            }
            if (!onStart && line.indexOf(reg) >= 0) {
                onStart = true
            }
            index++;

        });
    }
}

//查找文件夹中所有文件
function queryfile(dir) {
    var fileList = [];
    function mkdir(dir) {
        var files = fs.readdirSync(dir);//传入文件名,返回文件数组列表
        files.forEach((item) => {//文件名数组循环
            //打开文件
            var _dir = fs.statSync(dir + item);
            if (_dir.isDirectory(dir + item)) {//判断是否是目录

                mkdir(dir + item + '/');
            } else {
                fileList.push(item);
                writeJsxFile(dir, item)
            }
        })
    }
    mkdir(dir);
    return fileList;
}
queryfile("../../baseComponents/")


// 查找document下是否有文件  有则将document下文件内容合并成json
function basefile(dir) {
    if (fs.existsSync('../mergeDocument.json')) {//判断是否有此文件
        fs.unlinkSync('../mergeDocument.json');//删除文件
    }
    var fileList = [];
    function mkdir(dir) {
        var files = fs.readdirSync(dir);//传入文件名,返回文件数组列表
        files.forEach((item) => {

            var _dir = fs.statSync(dir + item);
            if (_dir.isDirectory(dir + item)) {

                mkdir(dir + item + '/');
            } else {
                fileList.push(item);
                var fileJsxName = dir + item;
                if (!(item == '.DS_Store')) {
                    var readFileSync = fs.readFileSync(fileJsxName);//读取文件内容
                    var delNameSuffix = item.split('.');
                    var baseName = '"'+delNameSuffix[0] + '=' + '{' + '\n' + readFileSync.toString() + '}'+'"' + '\n'
                    fs.appendFileSync('../mergeDocument.json', baseName);//追加内容
                } 
            }
        })
    }
    mkdir(dir);
    return fileList;
}