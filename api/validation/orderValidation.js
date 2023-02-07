const Joi = require("joi");

exports.validateOrderByWorker = (_reqBody) => {
    let schemaJoi = Joi.object({
        status: Joi.string().min(2).max(99).required(),
        note: Joi.string().min(2).max(120).allow(null, ""),
        discount: Joi.number().allow(null, 0),
        finalPrice: Joi.number().allow(null, 0),
        estimatedTime: Joi.date().allow(null, ""),

    })
    return schemaJoi.validate(_reqBody);
}
exports.validateOrderByCustumer = (_reqBody) => {
    let schemaJoi = Joi.object({
        status: Joi.string().min(2).max(99).required(),
        note: Joi.string().min(2).max(120).allow(null, ""),
        finalPrice: Joi.number().allow(null, 0),
        isTA: Joi.boolean().required(),
        byCustumer:{
            byCustumer:Joi.boolean().required(),
        }

    })
    return schemaJoi.validate(_reqBody);
}