// 

const jwt = require("jsonwebtoken");
const {config} = require("../config/secret")

exports.createToken = (_id,role,jobs) => {
    let token = jwt.sign({_id,role,jobs},config.tokenSecret,{expiresIn:"1440mins"});
    return token;
  }