const mongoose = require('mongoose');
const {resolve} = require('path');
const glob = require('glob');
const db = 'mongodb://localhost/mobile-shopmall';

exports.initSchemas = () => {
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require);
}
exports.connect = () => {
    mongoose.connect(db);
    let maxConnectTime = 0;
    //数据库监听事件
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{
            console.log('database disconnect,now is tring to connect');
            if(maxConnectTime <= 3){
                maxConnectTime++;
                mongoose.connect(db);
            }else{
                reject();
                return new Error('数据库异常，终止尝试连接')
            }
            
        })
        mongoose.connection.on('err',(err)=>{
            if(maxConnectTime <= 3){
                maxConnectTime++;
                mongoose.connect(db);
            }else{
                reject(err);
                return new Error('数据库异常，终止尝试连接')
            }
        })
        mongoose.connection.on('open',()=>{
            console.log('数据库连接 successfully');
            resolve();
        })
    })
}