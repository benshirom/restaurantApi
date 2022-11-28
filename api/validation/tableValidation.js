const Joi = require("joi");

exports.validateAddTable = (_reqBody) => {
    let schemaJoi = Joi.object({
        status: Joi.string().min(2).max(99).required(),
        seats: Joi.number().min(1).max(50).required(),
        tableNumber:Joi.number().required() ,
        location:{
            x:Joi.number().required(),
            y:Joi.number().required()
        } ,
       

    })
    return schemaJoi.validate(_reqBody);
}

exports.validateEditTable = (_reqBody) => {
    let schemaJoi = Joi.object({
        status: Joi.string().min(2).max(99).allow(null, ""),
        seats: Joi.number().min(1).max(50).allow(null, ""),
        tableNumber:Joi.number().allow(null,"") 
       
    })
    return schemaJoi.validate(_reqBody);
}
exports.validateEditTableLocation = (_reqBody) => {
    let schemaJoi = Joi.object({
        location:{
            x:Joi.number().required(),
            y:Joi.number().required()
        } 
       
    })
    return schemaJoi.validate(_reqBody);
}