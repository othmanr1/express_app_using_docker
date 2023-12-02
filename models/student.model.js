const mongoose = require('mongoose');
const adressSchema = mongoose.Schema({
    
    street : String,    
    CP : {
        type : Number,
        min:20000 ,
        required:true
    } ,
    city : String
     
   
});
const StudentSchema = mongoose.Schema({
    name : String,    
    age : {
        type : Number,
        min:20 ,
        required:true
    } ,
    subDate : {
        type :Date,
        default : Date.now
    } ,
    adress : adressSchema,
    courses : [String],
    classRes :{ type : mongoose.SchemaTypes.ObjectId, ref: 'Student'}
   
});

module.exports = mongoose.model('Student',StudentSchema);