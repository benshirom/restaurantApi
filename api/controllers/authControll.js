const bcrypt = require("bcrypt");
const path = require("path");
const { UserModel } = require("../models/userModel");
const { VerificationModel } = require("../models/verificationModel");
const { RestaurantModel } = require("../models/restaurantModel");

const { config } = require("../config/secret");
const { validSignUpUser, validLogin, validSignUpWorker, validSignUpManager } = require("../validation/userValidation");
const { createToken, sendVerificationEmail, sendResetPasswordEmail } = require("../helpers/userHelper");



exports.authCtrl = {
  signUp: async (req, res) => {
    let validBody = validSignUpUser(req.body);

    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let user = new UserModel(req.body);
      console.log(user)
      console.log(config.salRounds)

      user.password = await bcrypt.hash(user.password, config.salRounds);
      await user.save();
      user.password = "***";
      sendVerificationEmail("user", user, res);
      res.status(201).json(user);
    }
    catch (err) {
      if (err.code == 11000) return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }
  },
  signUpManager: async (req, res) => {
    console.log(req.body)
    req.body.worker.jobs = ["manager"];

    let validBody = validSignUpManager(req.body);

    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }

    try {
      let user = new UserModel(req.body);

      user.password = await bcrypt.hash(user.password, config.salRounds);
      await user.save();
      user.password = "***";
      sendVerificationEmail("manager", user, res);

      res.status(201).json(user);
    }
    catch (err) {
      if (err.code == 11000) {
        return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

      }
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }
  },
  signUpWorker: async (req, res) => {
    let validBody = validSignUpWorker(req.body);
    // במידה ויש טעות בריק באדי שהגיע מצד לקוח
    // יווצר מאפיין בשם אירור ונחזיר את הפירוט של הטעות
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let { restId } = req.params;
      let user = new UserModel(req.body);
      user.worker.restaurantID.push(restId)
      console.log(user)
      await user.save()
      await RestaurantModel.updateOne({ _id: restId }, { $push: { 'workersArray': user._id } })

      sendVerificationEmail("worker", user, res);
      res.status(201).json(user);
    }
    catch (err) {
      if (err.code == 11000) {
        return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

      }
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }
  },


  login: async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
      // .details -> מחזיר בפירוט מה הבעיה צד לקוח
      return res.status(400).json(validBody.error.details);
    }
    try {
      // קודם כל לבדוק אם המייל שנשלח קיים  במסד
      let user = await UserModel.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json({ err: "Password or email is worng ,code:1" })
      }
      if (!user.verified) {
        return res.status(401).json({ err: "Email hasnt been verified yet. check your inbox. " });
      }
      if (!user.active) {
        res.json({ status: "failed", err: " account as been suspended" });
      }
      // אם הסיסמא שנשלחה בבאדי מתאימה לסיסמא המוצפנת במסד של אותו משתמש
      let authPassword = await bcrypt.compare(req.body.password, user.password);
      if (!authPassword) {
        return res.status(401).json({ err: "Password or email is worng ,code:2" });
      }
      // מייצרים טוקן לפי שמכיל את האיידי של המשתמש
      let token = createToken(user._id, user.role, user.worker.jobs);
      let data = {
        token: token,
        userRole: user.role,
        id: user._id,
        jobs: user.worker.jobs
      }
      res.json(data);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },

  verifyUser: async (req, res) => {
    let { userId, uniqueString } = req.params;
    console.log("in")
    try {
      let verification = await VerificationModel.findOne({ id: userId })
      const { expiresAt } = verification;
      const hashedUniqueString = verification.uniqueString;
      if (verification) {
        if (expiresAt < Date.now()) {
          try {
            console.log("לא בתוקף")
            await VerificationModel.deleteone({ id: userId })
            await UserModel.deleteone({ _id: userId })
            let message = "link hsa expired.please sigh up again ";
            res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);
          } catch (error) {
            let message = "an error occurre while clearing expired user verification record";
            res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);
            
          }
        } else {
          console.log("בתוקף")
          let result = bcrypt.compare(uniqueString, hashedUniqueString)
          if (result) {
            
            console.log("שווה")
            try {
              let update = await UserModel.updateOne({ _id: userId }, { verified: true })
              if (update) {
                console.log("עדכן")
                // delete verify user collection when verified
                await VerificationModel.deleteOne({ id: userId })
                res.redirect(`${config.ReactUrl}/messages/`);
              } else {
                let message = "an error occurre while updating user verified ";
                res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);
              }
            } catch (error) {
              await VerificationModel.deleteOne({ _id: userId })
              // await UserModel.deleteOne({ _id: userId })
              let message = "invalid verification details passed.check your inbox.";
              res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);
            }
          } else {
            await VerificationModel.deleteOne({ _id: userId })
            await UserModel.deleteOne({ _id: userId })
            let message = "an error occurre while compering vrification sentence";
            res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);
          }
        }
      } else {
        // account alredy verified or not exist
        let message = "Account doesnt exist or has been verified already. Please sign up or login in.";
        res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);
      }
    } catch (error) {

      await VerificationModel.deleteOne({ uniqueString })
      let message = "an error occurre while checking for existing user Verification record ";
      res.redirect(`${config.ReactUrl}/messages/?error=true&message=${message}`);

    }

  },

  verifiedUser: async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/verified.html"))
  },


  requestPasswordReset: async (req, res) => {
    const { email } = req.body
    try {

      UserModel.findOne({ email }).then((user) => {
        if (user) {
          console.log(user.verified)
          if (!user.verified) {
            return res.json({ status: "failed", message: "Email isn't verified yet , please check your email" });
          }
          if (!user.active) {
            return res.json({ status: "failed", message: " account as been suspended" });
          }
          sendResetPasswordEmail("resetpassword", user, res);
          res.json("go to email");

        } else {
          return res.json({ status: "failed", message: "No account with the supplied email found. Please try again" });
        }
      });
    } catch (error) {
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }


  },
  resetPassword: async (req, res) => {
    const { userId, uniqueString, newPassword } = req.body;
    try {
      let verificationInfo = await VerificationModel.findOne({ id: userId });
      // console.log(verificationInfo)
      if (verificationInfo) {
        const { expiresAt } = verificationInfo;
        const hashedResetString = verificationInfo.uniqueString;
        console.log("hashedResetString :" + hashedResetString)
        console.log("uniqueString :" + uniqueString)
        console.log("userId :" + userId)
        if (expiresAt < Date.now()) {
          // checking if link expired
          let reset = await VerificationModel.deleteOne({ id: userId });
          // console.log(reset)
          if (!reset) {
            return res.status(401).json({ msg: "Password reset link as expired", err });
          }
        }

        let compareUniq = await bcrypt.compare(uniqueString, hashedResetString);
        // console.log(compareUniq)

        if (compareUniq) {
          const hashedNewPassword = await bcrypt.hash(
            newPassword,
            config.salRounds
          );
          if (hashedNewPassword) {
            // update user password
            let update = await UserModel.updateOne(
              { _id: userId },
              { password: hashedNewPassword, }
            );
            if (update) {
              // update completed
              let resetVerification = await VerificationModel.deleteOne({ id: userId });
              if (resetVerification) {
                res.status(200).json({ status: "Success", msg: "Password reset successfully" });
              } else {
                res.status(401).json({ msg: "Failed to update user password", error });
              }
            }
          }
        } else {
          res.status(401).json({ msg: "Invalid password details" });
          s
        }

      } else {
        // password reset request not found
        res.status(401).json({ msg: "Password reset request not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Checking for existing password recors failed" });
    }
  },

}
