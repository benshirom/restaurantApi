const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    restaurantID: mongoose.ObjectId,

    date_created: {
        type: Date, default: Date.now()
    },
    orderItems: [{ type: String }],
    estimatedTime: Date ,
    finalPrice: { type: Number, default: 0 },
    Discount: { type: Number, default: 0 },
    status: String,

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
