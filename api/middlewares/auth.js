const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

//Must be a registered user
exports.auth = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url" })
  }
  try {
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
  }
}
//Must be a registered working user
exports.authWorker = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url" })
  }
  try {
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // check if the role in the token of admin
    if (!decodeToken.jobs) {
      return res.status(401).json({ msg: "Token invalid or expired or not worker." })
    }

    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
  }
}

// Must be a registered user and waiter
exports.authWaiter = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url" })
  }
  try {
    let isWaiter= false;
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // check if the role in the token of admin
    if (!decodeToken.jobs) {
      return res.status(401).json({ msg: "Token invalid or expired or not worker." })
    } 
    else {
      decodeToken.jobs.forEach(job => {
        if (job == "waiter") {
          isWaiter = true;
        }
      });
    }

    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    if (isWaiter) {
      req.tokenData = decodeToken;
      next();
    }
    else {
      return res.status(401).json({ msg: "Token is not manager." })
    }
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
  }
}
// Must be a registered user and manager
exports.authManager = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url" })
  }
  try {
    let isManager = false;
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // check if the role in the token of admin
    if (!decodeToken.jobs) {
      return res.status(401).json({ msg: "Token invalid or expired or not worker." })
    } else {
      decodeToken.jobs.forEach(job => {
        if (job == "manager") {
          isManager = true;
        }
      });
    }

    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    if (isManager) {
      req.tokenData = decodeToken;
      next();
    }
    else {
      return res.status(401).json({ msg: "Token is not manager." })
    }
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
  }
}
//Must be a registered user and admin
exports.authAdmin = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You need to send token to this endpoint url" })
  }
  try {
    let decodeToken = jwt.verify(token, config.tokenSecret);
    // check if the role in the token of admin
    if (decodeToken.role != "admin") {
      return res.status(401).json({ msg: "Token invalid or expired, code: 43" })
    }

    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token invalid or expired, log in again or you hacker!" })
  }
}