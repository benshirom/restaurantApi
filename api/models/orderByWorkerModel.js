const mongoose = require("mongoose");

let orderByWorkerSchema = new mongoose.Schema({
    tableNumber:Number,
    
    date_created: {
        type: Date, default: Date.now()
    },
    workerID: mongoose.ObjectId,
    orderItems:[{type:String}],
    estimatedTime:{type:Date},
    status: String,
    Discount:{type:Number ,default:0},
    isPaid:{ type: Boolean, default: false },
    finalPrice:{type:Number ,default:0},

})

exports.orderByWorkerModel = mongoose.model("orderByWorkers", orderByWorkerSchema);
