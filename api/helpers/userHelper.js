// 
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")
const nodemailer = require("nodemailer");
const { VerificationModel } = require("../models/verificationModel");
const { mailOptions } = require("./mailHelper");
exports.createToken = (_id, role, jobs) => {
  //24h
  let token = jwt.sign({ _id, role, jobs }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
};
const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.authEmail,
    pass: config.authPass
  }
});

 

exports.sendVerificationEmail = async (emailType,{ _id, email }, res) => {
 
  console.log("email " + email)
  console.log("id " + _id)
  const uniqueString = uuidv4() + _id;
  let mail = mailOptions(emailType,_id, uniqueString, email);
  await bcrypt
    .hash(uniqueString, config.salRounds)
    .then((hasheduniqueString) => {
      const Verification = new VerificationModel({
        id: _id,
        uniqueString: hasheduniqueString,
      });
      Verification
        .save()
        .then(() => {
          transporter.sendMail(mail, (err, info) => {
            if (err) console.log(err);
            console.log('Message sent: %s', info.response);
          })
        })
        .catch((error) => {
          console.log(error)
          res.json({
            status: "failed",
            message: "an error  cant save",
          });
        })
    })
    .catch(() => {
      res.json({
        status: "failed",
        message: "an error occurre",
      });
    })
};
exports.sendResetPasswordEmail = async (emailType,{ _id, email }, res) => {

  let request = await VerificationModel.findOne({id:_id})
  if(request) await VerificationModel.deleteOne({id:_id})  
  console.log("email " + email)
  console.log("id " + _id)
  const uniqueString = uuidv4() + _id;
  let mail = mailOptions(emailType,_id, uniqueString, email);
  await bcrypt
    .hash(uniqueString, config.salRounds)
    .then((hasheduniqueString) => {
      const Verification = new VerificationModel({
        id: _id,
        uniqueString: hasheduniqueString,
      });
      Verification
        .save()
        .then(() => {
          transporter.sendMail(mail, (err, info) => {
            if (err) console.log(err);
            console.log('Message sent: %s', info.response);
          })
        })
        .catch((error) => {
          console.log(error)
          res.json({
            status: "failed",
            message: "an error  cant save",
          });
        })
    })
    .catch(() => {
      res.json({
        status: "failed",
        message: "an error occurre",
      });
    })
};