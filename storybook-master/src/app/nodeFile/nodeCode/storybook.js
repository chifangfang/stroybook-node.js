//storybook  调用baseComponentsFile下的index.js
var readline = require('readline');
var fs = require('fs');
var bookName=[];
var fileName= [];
function storybook(){
    //判断是否有'../storybook/storybook.js'文件，有则删除
    var storybookFile = '../storybook/storybook.js';
    if (fs.existsSync(storybookFile)) {
        fs.unlinkSync(storybookFile);
    }

    fs.readdir("../jsxFile/",function(err, files){
       files.forEach( function (file){
            //获取index.jsx文件内容，截取文件内容的文件名，在进行创建文件
            if(!(file=='index.js'||(file=='.DS_Store'))){
                file = file.split('.jsx');
                // bookName.push(file[0]);
                var storybookData = ".add('"+`${file[0]}`+"', () => (<Provider store={store}><"+`${file[0]}`+"Test/></Provider>))"
                fs.appendFileSync('../storybook/storybook.js', storybookData + '\n');
                var fileTest = file[0]+'Test'
                fileName.push(fileTest)
                console.log('------',fileName)
                
                storybookRead(fileName)
            }
        });
    });
    //逐行读写
    // var storybookRead = fs.createReadStream('./storybook/index.js');  //返回一个readStream（文件读取流，输入流）对象
    // var storybooLine = readline.createInterface({
    //     input: storybookRead,
    // });
    // storybooLine.on("close", () => {
       
    // })
    // //逐步读取baseContent文件里的内容
    // storybooLine.on('line', (line) => {
    //    if(line.indexOf("storiesOf('material-ui', module)") >= 0){

    //     var bookData = fs.readFileSync('./storybook/storybook.js');
    //     console.log('bookData',bookData.toString())
    //     fs.appendFileSync('./storybook/index.js', bookData);
    //    }
    // });
}
storybook()

//将数据放到storybook的index.js文件中
function storybookRead(file){
    var bookData = fs.readFileSync('../storybook/storybook.js');
    bookData = "import React from 'react';"+'\n'+
                "import { storiesOf } from '@storybook/react';"+'\n'+
                "import { action } from '@storybook/addon-actions';"+'\n'+
                "import {" + `${file}`+ "} from './nodeFile/jsxFile';"+'\n'+
                "import { Provider } from 'react-redux';"+'\n'+
                "import { createStore, compose, applyMiddleware } from 'redux';"+'\n'+
                "import thunkMiddleware from 'redux-thunk';"+'\n'+
                "import todoApp from './redux/allReducers';"+'\n'+
                "import middleware from './middleware/middleware';"+'\n'+
                "const middlewareList = [thunkMiddleware, middleware];"+'\n'+
                "const finalCreateStore = compose("+'\n'+
                    " applyMiddleware(...middlewareList),"+'\n'+
                    " )(createStore);"+'\n'+
                "const store = finalCreateStore(todoApp);"+'\n'+'\n'+
                "storiesOf('material-ui', module)"+'\n'+bookData;
    fs.writeFileSync('../../index.js',bookData)
}

