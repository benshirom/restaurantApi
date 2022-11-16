const mongoose = require("mongoose");

let tableSchema = new mongoose.Schema({
    //order id
    tableOwenr: mongoose.ObjectId||null, 
    seats:Number,
    status:String,
    location:{
        x:Number,
        y:Number
    }  
})
exports.tableModel = mongoose.model("tables", tableSchema);
