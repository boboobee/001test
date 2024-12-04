var mongoose=require("./mongoose.js");
var Equipment_FormSchema=new mongoose.Schema({
    EquipmentType: String,
    EquipmentModel: String,
    TaskName: String,
    Operators: String,
    topic: String,
});
module.exports=mongoose.model('Equipment_Form',Equipment_FormSchema);