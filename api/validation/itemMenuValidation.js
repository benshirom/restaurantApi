const Joi = require("joi");

exports.validateItemMenu = (_reqBody) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(3).max(100).allow(null, ""),
        img: Joi.string().min(2).max(999).allow(null, ""),
        video: Joi.string().min(2).max(999).allow(null, ""),
        price: Joi.number().required(),
        calories: Joi.number().allow(null, 0),
        category:Joi.string().min(2).max(20).required(),
        subCategory: Joi.string().min(2).max(20).allow(null, "")
        

    })
    return schemaJoi.validate(_reqBody);
}
exports.validateEditItemMenu = (_reqBody) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        info: Joi.string().min(3).max(100).allow(null, ""),
        img: Joi.string().min(2).max(999).allow(null, ""),
        video: Joi.string().min(2).max(999).allow(null, ""),
        price: Joi.number(),
        calories: Joi.number(),
        category:Joi.string().min(2).max(20).required(),
        subCategory: Joi.string().min(2).max(20).allow(null, "")
       
    })
    return schemaJoi.validate(_reqBody);
}