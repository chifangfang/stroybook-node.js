//获取文件名，写入文件名加.jsx   导出引用
var readline = require('readline');
var fs = require('fs');
var arrPush = [];

//获取../../baseComponents/ 下所有文件
fs.readdir("../../baseComponents/",function(err, files){
    
    //每次输入命令行node  则判断index.jsx 是否存在，存在直接删除
    if (fs.existsSync('../jsxFile/index.jsx')) {
        fs.unlinkSync('../jsxFile/index.jsx');
    }
    allFile('../jsxFile/')
   files.forEach( function (file){
        
        //获取index.jsx文件内容，截取文件内容的文件名，在进行创建文件
        if(file=='index.jsx'){
            var fRead = fs.createReadStream('../../baseComponents/index.jsx');  //返回一个readStream（文件读取流，输入流）对象
            //逐行读写
            var objReadline = readline.createInterface({
                input: fRead,
            });
            objReadline.on("close", () => {
                
            })
            objReadline.on('line', (line) => {
                //直接把Modal文件排除（原因 多个子文件.jsx 
                
                // if(!(line.indexOf('// export') > -1)){
                    if(!(line.indexOf('*')>-1)){
                        var baseComponentsFile = line.split(' ');
                        //每读取index.js一行  就判断是否有{baseComponentsFile[1]}`+'.jsx 文件  有 则进行删除
                        // var baseFile = './baseComponentsFile/' + `${baseComponentsFile[1]}`+'.jsx';
                        // if (fs.existsSync(baseFile)) {
                        //         fs.unlinkSync(`${baseFile}`);
                        // }
                        //读取baseContent.jsx文件  逐行写入（插入
                        baseContentFile("../componentCode.jsx",baseComponentsFile[1]);
                    }else{
                        //获取 * 下的所有文件
                        var fileName = line.split('./');
                        fileName = fileName[1].split("'");
                        fs.readdir("../../baseComponents/"+`${fileName[0]}`,function(err, sonFiles){
                            funBaseComponentsFile(sonFiles,fileName[0])
                        })
                        
                    }
                // }
                
            });
        }
    });
});



//给baseComponntsFile文件夹创建文件

function funBaseComponentsFile(lise,fileName){
    lise.forEach( function (sonFile){
        if(sonFile=='index.jsx'){
            var fRead = fs.createReadStream('../../baseComponents/'+`${fileName}`+'/index.jsx');  //返回一个readStream（文件读取流，输入流）对象
            //逐行读写
            var objReadline = readline.createInterface({
                input: fRead,
            });
            objReadline.on("close", () => {
                jsonData()
            })
            objReadline.on('line',(line) => {
                var baseComponentsFileName = line.split(' ');
                // var baseFileName = './baseComponentsFile/' + `${baseComponentsFileName[1]}`+'.jsx';
                // if (fs.existsSync(baseFileName)) {
                //         fs.unlinkSync(`${baseFileName}`);
                // }
                baseContentFile("../componentCode.jsx",baseComponentsFileName[1]);
            })
            
        }
    })
}

//    创建index.js 暴露文件名
function indexFile(file){
    var indexfile = '../jsxFile/index.js';
    if (fs.existsSync(indexfile)) {
        file = 'export ' + file + 'Test from ' + "'"+'./'+ file +"';"+'\n';
        fs.appendFileSync(indexfile,file)
    
    }else{
        fs.writeFileSync('../jsxFile/index.js',"")
        file = 'export ' + file + 'Test from ' + "'"+'./'+ file +"';"+'\n';
        fs.appendFileSync(indexfile,file)
    }
}

//读取baseContent.jsx文件  逐行写入（插入    
//file  文件名 如：Button.jsx
//data  如：Button
function baseContentFile(file,data){
    var fReadBaseContent = fs.createReadStream(file);  //返回一个readStream（文件读取流，输入流）对象
    //逐行读写
    var objBaseContentLine = readline.createInterface({
        input: fReadBaseContent,
    });
    arrPush.push('baseComponentsFile');
    objBaseContentLine.on("close", () => {
        indexFile(data);
        arrPush.splice(0,1);
        if(arrPush.length===0){
            console.log('--------')
            jsonData()
        }
    })
    //逐步读取baseContent文件里的内容
    objBaseContentLine.on('line', (line) => {
        if(line.indexOf('import * from') > -1){
            line = 'import {'+ `${data}` +'} from "../../baseComponents"';
        }
        if(line.indexOf('extends React.Component')>-1){
            line = 'class '+data+'Test extends React.Component {'
        }
        if(line.indexOf('<MuiThemeProvider>')>-1){
            line = '<div>'+'\n'+'<MuiThemeProvider>'+'\n'+'<'+data+'/>';
        }
        if(line.indexOf('</MuiThemeProvider>')>-1){
            line = '</MuiThemeProvider>'+'\n'+'</div>';
        }
        if(line.indexOf('export default')>-1){
            line = 'export default '+data+'Test;'
        }
        //内容追加到${baseComponentsFile[1]}.jsx里
        fs.appendFileSync('../jsxFile/'+`${data}`+'.jsx', line + '\n');
    });
} 

//读取json文件  获取对象与文件名相同的数据
function jsonData(){
    fs.readdir('../document/',function(err,jsonFiles){
        jsonFiles.forEach( function (jsonfile){
            var jsonfileData=fs.readFileSync('../document/'+`${jsonfile}`);
            fs.readdir('../jsxFile/',function(err,files){
                files.forEach(function(file){
                    var fileData=fs.readFileSync('../jsxFile/'+`${file}`);
                    var jsonF = jsonfile.split('.');
                    file = file.split('.');
                    if(jsonF[0]==file[0]){
                        fileData = fileData.toString().split('</MuiThemeProvider>');
                        var sumData = fileData[0]+'</MuiThemeProvider>'+'\n'+'<div style={{clear:'+"'"+"both"+"'"+",marginLeft:"+"'"+"50px"+"'"+"}}>"+'\n'+jsonfileData+'\n'+'</div>'+'\n'+fileData[1];
                        fs.writeFileSync('../jsxFile/'+`${file[0]}`+'.jsx',sumData)
                    }
                })
            })
        })
    })
}


//获取所有文件  进行删除
function allFile(path){
    fs.readdir(path,function(err,files){
        files.forEach(function(file){
            var allFile = path + `${file}`;
            if (fs.existsSync(allFile)) {
                    fs.unlinkSync(`${allFile}`);
            }
        })
    })
}