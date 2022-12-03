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
    // need to add info for order and for orderItems
    byWorker: {
        // tableNumber: Number,
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
