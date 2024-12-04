var mongoose=require("./mongoose.js");
var MissionPolygonSchema=new mongoose.Schema({
     order     : String,
     name      : String,
     longitude : String,
     latitude  : String,
    
});
module.exports=mongoose.model('MissionPolygon',MissionPolygonSchema);
