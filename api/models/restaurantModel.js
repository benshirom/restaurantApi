const { json } = require("express");
const { number } = require("joi");
const mongoose = require("mongoose");

let restaurantSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email:{ type: String, default: "" },
    phone: { type: String, default: "" },
    info:{ type: String, default: "" },
    address: {
        country:{type: String, default: ""} ,
        city:{type: String, default: ""} ,
        Street: {type: String, default: ""},
        num: { type: Number, default: 1 }
    },
    creatorID: { type:mongoose.ObjectId, default:null},
 
    gallry:{
        img:[{type: String, default: ""}],
        video:[{type: String, default: ""}],
    },
    //Item Menu Id
    menu:[mongoose.ObjectId],
    //Worker Id
    workersArray: [mongoose.ObjectId],
    //Table Id
    tables:[mongoose.ObjectId],
    tablesCanvas:{
       canvas: {type:JSON, default:""},
       height:{type:String, default:""},
       width:{type:String, default:""}
    }
        ,
    //order Id
    orders:[mongoose.ObjectId],

    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  
},{timestamps:true})
exports.RestaurantModel = mongoose.model("restaurants", restaurantSchema);
