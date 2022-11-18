// 

const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

exports.createToken = (_id, role, jobs) => {
  let token = jwt.sign({ _id, role, jobs }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
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