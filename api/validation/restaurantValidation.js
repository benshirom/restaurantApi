const Joi = require("joi");


exports.validateRestaurant = (_reqBody) =>{
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(4).max(99).email().required(),
        phone: Joi.string().min(10).max(12).pattern(/^[0-9]+$/).required(),
        address: Joi.string().min(5).max(99).required(),
        info: Joi.string().min(3).max(100).allow(null,""),
    })
    return schemaJoi.validate(_reqBody);
}
