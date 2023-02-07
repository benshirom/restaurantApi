const Joi = require("joi");

exports.validateItemOrder = (_reqBody) => {
    let schemaJoi = Joi.object({
        note: Joi.string().min(2).max(99).allow(null, ""),
    })
    return schemaJoi.validate(_reqBody);
}
exports.validateItemsOrder = (_reqBody) => {
    let schemaJoi = Joi.object({
        items: Joi.array().required(),
    })
    return schemaJoi.validate(_reqBody);
}