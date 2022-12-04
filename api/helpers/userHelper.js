// 
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")
const nodemailer = require("nodemailer");
const { VerificationModel } = require("../models/verificationModel");
let transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.authEmail,
    pass: config.authPass
  }
});
exports.createToken = (_id, role, jobs) => {
  let token = jwt.sign({ _id, role, jobs }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
}

 const mailOptions= (emailType,_id, _uniqueString, _email) => { 
  if(emailType=="user"){

    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email",
      html: `<p>Verify Your Email </p><p> click <a href=${config.currentUrl + "/users/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }else if(emailType=="manager"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email manager",
      html: `<p>Verify Your Email manager </p><p> click <a href=${config.currentUrl + "/users/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }else if(emailType=="worker"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email worker",
      //צריך לשנות ראוט של מילוי פרטים
      html: `<p>Verify Your Email worker </p><p> click <a href=${config.currentUrl + "/users/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }
  else if(emailType=="restaurant"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email restaurant",
      html: `<p>Verify Your Email restaurant </p><p> click <a href=${config.currentUrl + "/restaurants/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }
  else if(emailType=="resetpassword"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email resetpassword",
            //צריך לשנות את הראוט לשינוי סיסמה

      html: `<p>Verify Your Email_uniqueString :  ${_uniqueString}<br>  id : ${_id} </p><p> click <a href=${config.currentUrl + "/restaurants/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }
  }

exports.sendVerificationEmail = async (emailType,{ _id, email }, res) => {

  // let request = await VerificationModel.findOne({id:_id})
  // if(request) await VerificationModel.deleteOne({id:_id})  
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