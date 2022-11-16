const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validUser  ,validLogin,validSignUpWorker,validSignUpManager,validWorkerFillDetails} = require("../validation/userValidation");
const { createToken } = require("../helpers/userHelper");

exports.authCtrl = {
    signUp:async(req,res) => {
        let validBody = validUser(req.body);
        // במידה ויש טעות בריק באדי שהגיע מצד לקוח
        // יווצר מאפיין בשם אירור ונחזיר את הפירוט של הטעות
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
        }
        try{
          let user = new UserModel(req.body);
          // נרצה להצפין את הסיסמא בצורה חד כיוונית
          // 10 - רמת הצפנה שהיא מעולה לעסק בינוני , קטן
          user.password = await bcrypt.hash(user.password, 10);
      
          await user.save();
          user.password = "***";
          res.status(201).json(user);
        }
        catch(err){
          if(err.code == 11000){
            return res.status(500).json({msg:"Email already in system, try log in",code:11000})
             
          }
          console.log(err);
          res.status(500).json({msg:"err",err})
        }
      },
      signUpManager: async (req, res) => {
        let validBody = validSignUpManager(req.body);
        // במידה ויש טעות בריק באדי שהגיע מצד לקוח
        // יווצר מאפיין בשם אירור ונחזיר את הפירוט של הטעות
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
        }
        try{
          let user = new UserModel(req.body);
          // נרצה להצפין את הסיסמא בצורה חד כיוונית
          // 10 - רמת הצפנה שהיא מעולה לעסק בינוני , קטן
          user.password = await bcrypt.hash(user.password, 10);
      
          await user.save();
          user.password = "***";
          res.status(201).json(user);
        }
        catch(err){
          if(err.code == 11000){
            return res.status(500).json({msg:"Email already in system, try log in",code:11000})
             
          }
          console.log(err);
          res.status(500).json({msg:"err",err})
        }
      },
      signUpWorker: async (req, res) => {
        let validBody = validSignUpWorker(req.body);
        // במידה ויש טעות בריק באדי שהגיע מצד לקוח
        // יווצר מאפיין בשם אירור ונחזיר את הפירוט של הטעות
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
        }
        try{
          let user = new UserModel(req.body);
          // נרצה להצפין את הסיסמא בצורה חד כיוונית
          // 10 - רמת הצפנה שהיא מעולה לעסק בינוני , קטן
          res.status(201).json(user);
        }
        catch(err){
          if(err.code == 11000){
            return res.status(500).json({msg:"Email already in system, try log in",code:11000})
             
          }
          console.log(err);
          res.status(500).json({msg:"err",err})
        }
      },
    

      login:async(req,res) => {
        let validBody = validLogin(req.body);
        if(validBody.error){
          // .details -> מחזיר בפירוט מה הבעיה צד לקוח
          return res.status(400).json(validBody.error.details);
        }
        try{
          // קודם כל לבדוק אם המייל שנשלח קיים  במסד
          let user = await UserModel.findOne({email:req.body.email})
          if(!user){
            return res.status(401).json({msg:"Password or email is worng ,code:1"})
          }
          // אם הסיסמא שנשלחה בבאדי מתאימה לסיסמא המוצפנת במסד של אותו משתמש
          let authPassword = await bcrypt.compare(req.body.password,user.password);
          if(!authPassword){
            return res.status(401).json({msg:"Password or email is worng ,code:2"});
          }
          // מייצרים טוקן לפי שמכיל את האיידי של המשתמש
          let token = createToken(user._id,user.role,user.worker.jobs);
          res.json({token});
        }
        catch(err){
          console.log(err)
          res.status(500).json({msg:"err",err})
        }
      }
}
