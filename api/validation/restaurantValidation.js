const Joi = require("joi");


exports.validateRestaurant = (_reqBody) =>{
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(4).max(99).email().required(),
        phone: Joi.string().min(10).max(12).pattern(/^[0-9]+$/).required(),
        address:{
            country: Joi.string().min(2).max(99) ,
            city: Joi.string().min(2).max(99),
            Street: Joi.string().min(2).max(99),
            num: Joi.number()
        },
        info: Joi.string().min(3).max(500).allow(null,""),
    })
    return schemaJoi.validate(_reqBody);
}


exports.validateEditRestaurant = (_reqBody) =>{
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        phone: Joi.string().min(10).max(12).pattern(/^[0-9]+$/).required(),
        info: Joi.string().min(3).max(500).required(),
        address:{
            country: Joi.string().min(2).max(99).required() ,
            city: Joi.string().min(2).max(99).required(),
            Street: Joi.string().min(2).max(99).required(),
            num: Joi.number().required()
        },
    })
    return schemaJoi.validate(_reqBody);
}
