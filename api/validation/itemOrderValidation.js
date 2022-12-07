const Joi = require("joi");

exports.validateItemMenu = (_reqBody) => {
    let schemaJoi = Joi.object({
        note: Joi.string().min(2).max(99).allow(null, ""),
    })
    return schemaJoi.validate(_reqBody);
}