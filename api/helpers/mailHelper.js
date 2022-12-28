const { config } = require("../config/secret")



exports.mailOptions= (emailType,_id, _uniqueString, _email) => { 
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
        html: `<p>Verify Your Email worker </p><p> click <a href=${config.ReactUrl + "/fillDetales/" + _id }> here</a> </p>`
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
  
        html: `<p>Verify Your Email_uniqueString :  ${_uniqueString}<br>  id : ${_id} </p><p> click <a href=${config.ReactUrl + "/resetPassword/" + _id + "/" + _uniqueString}> here</a> </p>`
      };
    
      return mailOptions;
    }
    };