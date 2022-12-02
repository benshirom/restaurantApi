const Joi = require("joi");

exports.validateOrderByWorker = (_reqBody) => {
    let schemaJoi = Joi.object({
        // orderItems?  workerID  mongoose.ObjectId, => otomtic
        status: Joi.string().min(2).max(99).required(),
        workerID: Joi.number().required(),      
        info: Joi.string().min(3).max(100).allow(null, ""),
        Discount: Joi.number().allow(null, 0),
        orderItems: Joi.string().required(),
        finalPrice: Joi.number().allow(null, 0),
        estimatedTime: Joi.date().allow(null, ""),      
       

    })
    return schemaJoi.validate(_reqBody);
}
exports.validateOrderByTaOrDelivery = (_reqBody) => {
    let schemaJoi = Joi.object({
        // orderItems?  workerID  mongoose.ObjectId, => otomtic
        status: Joi.string().min(2).max(99).required(),
        isPaid: Joi.number().required(),   
        info: Joi.string().min(3).max(100).allow(null, ""),
        Discount: Joi.number().allow(null, 0),
        orderItems: Joi.string().required(),
        finalPrice: Joi.number().allow(null, 0),
        estimatedTime: Joi.date().allow(null, ""),      
       

    })
    return schemaJoi.validateOrderByTaOrDelivery(_reqBody);
}