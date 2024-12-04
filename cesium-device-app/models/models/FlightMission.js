var mongoose=require("./mongoose.js");
var FlightMissionSchema=new mongoose.Schema({
     FlightArea  : String,
     MissionName : String,
     AssetNumber : String,
     AssetLength : String,
     FlightTime  : String,
     Operators   : String
});
module.exports=mongoose.model('FlightMission',FlightMissionSchema);
