const mongoose = require("mongoose");

let tableSchema = new mongoose.Schema({
    //order id
    orderID: { type:mongoose.ObjectId, default:null}, 
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
