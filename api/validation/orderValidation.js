const Joi = require("joi");

exports.validateOrderByWorker = (_reqBody) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(3).max(100).allow(null, ""),
        img: Joi.string().min(2).max(999).allow(null, ""),
        video: Joi.string().min(2).max(999).allow(null, ""),
        Price: Joi.number().required(),
        calories: Joi.number().allow(null, 0),
        category: {
            name: Joi.string().min(2).max(20).required(),
            subcategory: Joi.string().min(2).max(20).allow(null, "")
        }

    })
    return schemaJoi.validate(_reqBody);
}