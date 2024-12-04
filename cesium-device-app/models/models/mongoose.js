//import  mongoose from 'mongoose'; 

//引包
const mongoose=require("mongoose");
//连接数据库
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/UAVdata');

var db = mongoose.connection;
// eslint-disable-next-line no-unused-vars-,no-unused-vars
db.once('open', function (callback) {
    // eslint-disable-next-line no-console
	console.log("数据库连接成功");
    
});//向外暴露mongoose
module.exports = mongoose;
