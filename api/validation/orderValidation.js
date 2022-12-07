const Joi = require("joi");

exports.validateOrderByWorker = (_reqBody) => {
    let schemaJoi = Joi.object({
        status: Joi.string().min(2).max(99).required(),
        note: Joi.string().min(2).max(120).allow(null, ""),
        discount: Joi.number().allow(null, 0),
        orderItems: Joi.array().allow(null,[]),
        finalPrice: Joi.number().allow(null, 0),
        estimatedTime: Joi.date().allow(null, ""),
        isTA: Joi.boolean.allow(null, false),

    })
    return schemaJoi.validate(_reqBody);
}
exports.validateOrderByCustumer = (_reqBody) => {
    let schemaJoi = Joi.object({
        status: Joi.string().min(2).max(99).required(),
        note: Joi.string().min(2).max(120).allow(null, ""),
        discount: Joi.number().allow(null, 0),
        orderItems: Joi.string().required(),
        finalPrice: Joi.number().allow(null, 0),
        estimatedTime: Joi.date().allow(null, ""),
        isTA: Joi.boolean.allow(null, false),
        byCustumer:{
            isDelivery:Joi.boolean.allow(null, false),
            isPaid:Joi.boolean.allow(null, false),
        }

    })
    return schemaJoi.validateOrderByTaOrDelivery(_reqBody);
}