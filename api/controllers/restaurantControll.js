const bcrypt = require("bcrypt");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {  sendVerificationEmail } = require("../helpers/userHelper");
// const { config } = require("../config/secret");
const { RestaurantModel } = require("../models/restaurantModel");
const { validateRestaurant, validateEditRestaurant } = require("../validation/restaurantValidation");
// const { restaurantVerificationModel } = require("../models/restaurantVerificationModel");
const { UserModel } = require("../models/userModel");


// const sendVerificationEmail = async ({ _id, email }, res) => {
//   console.log("email " + email)
//   console.log("id " + _id)
//   const uniqueString = uuidv4() + _id;
//   let mail = mailOptions2(_id, uniqueString, email);
//   await bcrypt
//     .hash(uniqueString, config.salRounds)
//     .then((hasheduniqueString) => {
//       const restaurantVerification = new restaurantVerificationModel({
//         restaurantId: _id,
//         uniqueString: hasheduniqueString,
//       });
//       restaurantVerification
//         .save()
//         .then(() => {
//           transporter().sendMail(mail, (err, info) => {
//             if (err) console.log(err);
//             console.log('Message sent: %s', info.response);
//           })
//         })
//         .catch((error) => {
//           console.log(error)
//           res.json({
//             status: "failed",
//             message: "an error  cant save",
//           });
//         })
//     })
//     .catch(() => {
//       res.json({
//         status: "failed",
//         message: "an error occurre",
//       });
//     })
// };


exports.RestaurantCtrl = {
  createRestaurant: async (req, res) => {
    let validBody = validateRestaurant(req.body);

    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
      let restaurant = new RestaurantModel(req.body)
      restaurant.creatorID = req.tokenData._id;
      await restaurant.save();
      sendVerificationEmail("restaurant",restaurant, res)

      let userInfo = await UserModel.updateOne({ _id: req.tokenData._id },{ $push: { 'restaurantID': restaurant._id } })

      res.status(201).json(restaurant);

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "there error try again later", error })

    }
  },
  verifyRestaurant: async (req, res) => {

    let { restaId, uniqueString } = req.params;
    try {
      let user = await UserVerificationModel.findOne({ _id: restaId });

      if (user) {
        const hashedUniqueString = user.uniqueString;

        if (user.expiresAt < Date.now()) {
          try {

            await UserVerificationModel.deleteone({ _id: restaId })
            await RestaurantModel.deleteone({ _id: restaId })
            let message = "link hsa expired.please sigh up again ";
            res.redirect(`/restaurants/verified/?error=true&message=${message}`);

          }
          catch (error) {
            let message = "clearing restaurant with expired unique string failed ";
            res.redirect(`/users/verified/?error=true&message=${message}`);
          }
        }
        else {
          let result = await bcrypt.compare(uniqueString, hashedUniqueString)

          if (result) {
            try {
              let restaurantUpdate = await RestaurantModel.updateOne({ _id: restaId }, { verified: true })
              if (restaurantUpdate) {
                await UserVerificationModel.deleteOne({ _id: restaId })
                res.sendFile(path.join(__dirname,  "./../views/verifiedReataurant.html"));
              }
              else {
                let message = "an error occurre while updating restaurant verified ";
                res.redirect(`/restaurants/verified/?error=true&message=${message}`);
              }
            } catch (error) {
              await UserVerificationModel.deleteone({ _id: restaId })
              await RestaurantModel.deleteone({ _id: restaId })
              let message = "an error occurre invalid verification details passed ";
              res.redirect(`/restaurants/verified/?error=true&message=${message}`);
            }
          }else{
            await UserVerificationModel.deleteone({ _id: restaId })
            await RestaurantModel.deleteone({ _id: restaId })
            let message = "an error occurre  while compering details ";
            res.redirect(`/restaurants/verified/?error=true&message=${message}`);
          }

        }
      }else{
        let message = "an error occurre while checking for existing restaurant Verification record ";
      res.redirect(`/restaurants/verified/?error=true&message=${message}`);
      }
    } catch (error) {
       await UserVerificationModel.deleteOne({ uniqueString })
       await RestaurantModel.deleteOne({ _id: userId })
      let message ="an error occurre while checking for existing restaurant Verification record ";
      res.redirect(`/restaurants/verified/?error=true&message=${message}`);
    }


    
  },
  verifiedRestaurant: async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/verifiedReataurant.html"))

  },
  getRestaurant: async (req, res) => {
    try {
      let { resId } = req.params
      let data = await RestaurantModel.findOne({ _id: resId });
      res.json(data);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  getMyRestaurants: async (req, res) => {
    try {

      let data = await RestaurantModel.find({ creatorID: req.tokenData._id });
      res.json(data);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  }
  ,
  getMyWorkPlaces: async (req, res) => {
    try {
      console.log(req.tokenData._id)
      let { worker } = await UserModel.findById(req.tokenData._id);
      res.json(worker.restaurantID);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  editRestaurant: async (req, res) => {
    console.log(req.body)
    let validBody = validateEditRestaurant(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }
    try {
      let editId = req.params.editId;

      let resUpdate = await RestaurantModel.updateOne({ _id: editId }, req.body)
      res.json(resUpdate);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },

}