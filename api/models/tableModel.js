const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

let tableSchema = new mongoose.Schema({
    //order id
    tableOwenr: mongoose.ObjectId||null, 
    seats:Number,
    isCatched:{type:Boolean,default:false},
    status:String,
    location:{
        x:Number,
        y:Number
    }  ,
    tableNumber:Number
})
tableSchema.plugin(timestamps);
exports.TableModel = mongoose.model("tables", tableSchema);
