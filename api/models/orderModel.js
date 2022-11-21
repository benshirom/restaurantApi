const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    //Item Menu Id
    orderItems: [mongoose.ObjectId],
    status: String,
    estimatedTime: Date ,
    Discount: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    date_created: {
        type: Date, default: Date.now()
    },
    
    byWorker: {
        tableNumber: Number,
        workerID: mongoose.ObjectId,
    },
    byCustumer:
    {
        isPaid: { type: Boolean, default: false },
        custumerID: mongoose.ObjectId,
    },
    deliveryOrTA: {
        custumerID: mongoose.ObjectId,
    }
})
exports.orderModel = mongoose.model("orders", orderSchema);
