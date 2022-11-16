const Joi = require("joi");

exports.validSignUpUser = (_reqBody) => {
  let joiSchema = Joi.object({
    fullName: {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required()
    },
    email: Joi.string().min(4).max(99).email().required(),
    phone: Joi.string().min(10).max(12).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(6).max(99).required()
  })

  return joiSchema.validate(_reqBody);
}

exports.validLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required()
  })

  return joiSchema.validate(_reqBody);
}

exports.validSignUpWorker = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
  })

  return joiSchema.validate(_reqBody);
}
exports.validWorkerFillDetails = (_reqBody) => {
  let joiSchema = Joi.object({
    fullName: {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required()
    },
    phone: Joi.string().min(10).max(12).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(6).max(99).required()
  })

  return joiSchema.validate(_reqBody);
}