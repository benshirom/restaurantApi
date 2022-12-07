const mongoose = require("mongoose");

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
},{timestamps:true})
exports.TableModel = mongoose.model("tables", tableSchema);
