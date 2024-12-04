var mongoose=require("./mongoose.js");
var UserSchema=new mongoose.Schema({
	username  : String,
	password  : String,
});
module.exports=mongoose.model('User',UserSchema);
