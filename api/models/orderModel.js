const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

let orderSchema = new mongoose.Schema({
    //Item order Id
    orderItems: [mongoose.ObjectId],
    status: String,
    estimatedTime: Date ,
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    note:{ type:String, default:""},
    isTA:{ type:Boolean, default:false},
   
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
  
})
orderSchema.plugin(timestamps);
exports.orderModel = mongoose.model("orders", orderSchema);
