const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    //Item order Id
    orderItems: [mongoose.ObjectId],
    status: String,
    estimatedTime: Date ,
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    note:{ type:String, default:""},
    isTA:{ type:Boolean, default:false},
    actice:{ type:Boolean, default:true},
    // need to add info for order and for orderItems
    byWorker: {
        // tableNumber: Number,
        workerID: mongoose.ObjectId,
    },
    byCustumer:
    {
        isDelivery:{type:Boolean, default:false},
        isPaid: { type: Boolean, default: false },
        custumerID: mongoose.ObjectId,
    },
  
},{timestamps:true})
exports.orderModel = mongoose.model("orders", orderSchema);
