const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    //Item order Id
    orderItems: [mongoose.ObjectId],
    status: String,
    estimatedTime: {type:Date , default: ""} ,
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    note:{ type:String, default:""},
    isTA:{ type:Boolean, default:false},
    active:{ type:Boolean, default:true},
    // need to add info for order and for orderItems
    byWorker: {
        // tableNumber: Number,
        workerID: { type:mongoose.ObjectId, default:null},
    },
    byCustumer:
    {
        isDelivery:{type:Boolean, default:false},
        isPaid: { type: Boolean, default: false },
        custumerID: { type:mongoose.ObjectId, default:null},
    },
  
},{timestamps:true})
exports.orderModel = mongoose.model("orders", orderSchema);
