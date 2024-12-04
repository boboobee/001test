var mongoose=require("./mongoose.js");
var RealTimeSchema=new mongoose.Schema({
    Point     : String,
    longitude : String,
    latitude  : String
});
module.exports=mongoose.model('RealTime',RealTimeSchema);
