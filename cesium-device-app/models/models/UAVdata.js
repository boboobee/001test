var mongoose=require("./mongoose.js");
var UAVdataSchema=new mongoose.Schema({
    longitude: String,
    latitude: String,
    height: String,
    Heading: String,
    Pitch: String,
    Roll: String,
    EquipmentName:String,
    speed:String
});
module.exports=mongoose.model('UAVdata',UAVdataSchema);