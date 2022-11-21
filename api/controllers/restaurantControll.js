const bcrypt = require("bcrypt");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { mailOptions2, transporter } = require("../helpers/userHelper");
const { config } = require("../config/secret");

const { RestaurantModel } = require("../models/restaurantModel");
const { validateRestaurant } = require("../validation/restaurantValidation");
const { restaurantVerificationModel } = require("../models/restaurantVerificationModel");
const { UserModel } = require("../models/userModel");


const sendVerificationEmail = async ({ _id, email }, res) => {
    console.log("email " + email)
    console.log("id " + _id)
    const uniqueString = uuidv4() + _id;
    let mail = mailOptions2(_id, uniqueString, email);
    await bcrypt
        .hash(uniqueString, config.salRounds)
        .then((hasheduniqueString) => {
            const restaurantVerification = new restaurantVerificationModel({
                restaurantId: _id,
                uniqueString: hasheduniqueString,
            });
            restaurantVerification
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


exports.RestaurantCtrl = {
    createRestaurant: async (req, res) => {
        let validBody = validateRestaurant(req.body);
        if (validBody.error) return res.status(400).json(validBody.error.details);
        try {
            let restaurant = new RestaurantModel(req.body)
            restaurant.creatorID = req.tokenData._id;
            await restaurant.save();
            sendVerificationEmail(restaurant, res)

            let userInfo = await UserModel.findOne({ _id: req.tokenData._id })

            userInfo.worker.restaurantID.push(restaurant._id)
            await UserModel.updateOne({ _id: userInfo._id }, userInfo)

            res.status(201).json(restaurant);

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "there error try again later", error })

        }
    },
    verifyRestaurant: async (req, res) => {
        let { restaId, uniqueString } = req.params;
        restaurantVerificationModel
          .findOne({ restaId })
          .then((result) => {
            console.log(result)
            const hashedUniqueString = result.uniqueString;
            if (result.expiresAt < Date.now()) {
              restaurantVerificationModel
                .deleteone({ restaId })
                .then(result => {
                  RestaurantModel
                    .deleteone({ _id: restaId })
                    .then(() => {
                      let message = "link hsa expired.please create resraurant agin ";
                      res.redirect(`/restaurants/verified/?error=true&message=${message}`);
                    })
                    .catch((error) => {
                      let message = "clearing user with expired unique string failed ";
                      res.redirect(`/restaurants/verified/?error=true&message=${message}`);
                    })
                })
                .catch((error) => {
                  console.log(error);
                  let message = "an error occurre while clearing  expired resraurant verification record";
                  res.redirect(`/restaurants/verified/?error=true&message=${message}`);
                })
            } else {
              if (bcrypt.compare(uniqueString, hashedUniqueString)) {
                RestaurantModel.updateOne({ _id: restaId }, { verified: true })
                  .then(() => {
                    restaurantVerificationModel
                      .deleteOne({ restaId })
                      .then(() => {
                        res.sendFile(path.join(__dirname, "./../views/verifiedReataurant.html"));
                      })
                      .catch(error => {
                        console.log(error)
                        let message = "an error occurre while finalizing sucssful verification  ";
                        res.redirect(`/restaurants/verified/?error=true&message=${message}`);
                      })
                  })
                  .catch(error => {
                    console.log(error)
                    let message = "an error occurre while updating user verified ";
                    res.redirect(`/restaurants/verified/?error=true&message=${message}`);
                  })
              } else {
                console.log(error)
                let message = "an error occurre while compering unique strings ";
                res.redirect(`/restaurants/verified/?error=true&message=${message}`);
              }
            }
          })
          .catch((error) => {
            console.log(error)
            let message = "an error occurre while checking for existing user Verification record ";
            res.redirect(`/restaurants/verified/?error=true&message=${message}`);
          })
    },
    verifiedRestaurant: async (req, res) => {
        res.sendFile(path.join(__dirname, "../views/verifiedReataurant.html"))

    }
}