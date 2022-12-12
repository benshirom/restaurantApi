const Joi = require("joi");

exports.validateItemOrder = (_reqBody) => {
    let schemaJoi = Joi.object({
        itemMenuId : Joi.string().min(3).required(),
        note: Joi.string().min(2).max(99).allow(null, ""),
    })
    return schemaJoi.validate(_reqBody);
}