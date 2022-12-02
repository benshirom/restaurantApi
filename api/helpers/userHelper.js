const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { UserVerificationModel } = require("../models/userVerificationModel");

const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")
const nodemailer = require("nodemailer");

const transporter=()=>{
  let transporter = nodemailer.createTransport({
    
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: config.authEmail,
      pass: config.authPass
    }
  });
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
      console.log(config.authEmail);
      console.log(config.authPass);
    } else if (success) {
      console.log("ready for messages");
      console.log("success");
    }
    
  })
  return transporter;
}
exports.createToken = (_id, role, jobs) => {
  let token = jwt.sign({ _id, role, jobs }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
}
//user and manager
exports.mailOptions = (_userType,_id, _uniqueString, _email) => {

  if(_userType=="manager"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email",
      html: `<p>Verify Your Email </p><p> click <a href=${config.currentUrl + "/users/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }
  else if(_userType=="user"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email",
      html: `<p>Verify Your Email </p><p> click <a href=${config.currentUrl + "/users/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }
  else if(_userType=="restaurant"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "Verify Your Email restaurant",
      html: `<p>Verify Your Email restaurant </p><p> click <a href=${config.currentUrl + "/restaurants/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }
  else if(_userType=="worker"){
    const mailOptions = {
      from: config.authEmail,
      to: _email,
      subject: "workerrr",
      //צריך לשלוח לURL הנכון של הפרונט כדי למלא את הפרטים
      html: `<p>Verify Your Email restaurant </p><p> click <a href=${config.currentUrl + "/restaurants/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
    };
  
    return mailOptions;
  }

}


exports.sendVerificationEmail = async (userType,{ _id, email }, res) => {
  console.log("email " + email)
  console.log("id " + _id)
  const uniqueString = uuidv4() + _id;
  let mail = mailOptions(userType,_id, uniqueString, email);
  
  
 let hasheduniqueString=  await bcrypt.hash(uniqueString, config.salRounds)
    .then((hasheduniqueString) => {
      const UserVerification = new UserVerificationModel({
        userId: _id,
        uniqueString: hasheduniqueString,
      });
      UserVerification
        .save()
        .then(() => {
          transporter().sendMail(mail, (err, info) => {
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