// 

const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")
const nodemailer = require("nodemailer");

exports.createToken = (_id, role, jobs) => {
  let token = jwt.sign({ _id, role, jobs }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
}

exports.transporter=()=>{
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

exports.mailOptions = (_id, _uniqueString, _email) => {
  const mailOptions = {
    from: config.authEmail,
    to: _email,
    subject: "Verify Your Email",
    html: `<p>Verify Your Email </p><p> click <a href=${config.currentUrl + "/users/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
  };

  return mailOptions;
}
exports.mailOptions2 = (_id, _uniqueString, _email) => {
  const mailOptions = {
    from: config.authEmail,
    to: _email,
    subject: "Verify Your Email restaurant",
    html: `<p>Verify Your Email restaurant </p><p> click <a href=${config.currentUrl + "/restaurants/verify/" + _id + "/" + _uniqueString}> here</a> </p>`
  };

  return mailOptions;
}