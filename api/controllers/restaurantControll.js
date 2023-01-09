const bcrypt = require("bcrypt");
const path = require("path");
const { sendVerificationEmail } = require("../helpers/userHelper");
const { RestaurantModel } = require("../models/restaurantModel");
const {
  validateRestaurant,
  validateEditRestaurant,
  validateTablesCanvas,
} = require("../validation/restaurantValidation");
const { VerificationModel } = require("../models/verificationModel");
const { UserModel } = require("../models/userModel");

exports.RestaurantCtrl = {
  createRestaurant: async (req, res) => {
    let validBody = validateRestaurant(req.body);
console.log(req.body);
    if (validBody.error) return res.status(400).json(validBody.error.details,req.body);

    try {
      let userInfo = await UserModel.findOne({ _id: req.tokenData._id });
      let restaurant = new RestaurantModel(req.body);
      restaurant.creatorID = req.tokenData._id;
      if (restaurant.email != userInfo.email) {
        await sendVerificationEmail("restaurant", restaurant, res);
      } else {
        restaurant.verified = true;
      }

      await restaurant.save();
      userInfo.worker.restaurantID.push(restaurant._id);
      await UserModel.updateOne({ _id: userInfo._id }, userInfo);

      res.status(201).json(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "there error try again later", error });
    }
  },
  verifyRestaurant: async (req, res) => {
    let { restaId, uniqueString } = req.params;
    VerificationModel.findOne({ id: restaId })
      .then((result) => {
        console.log(result);
        const hashedUniqueString = result.uniqueString;
        if (result.expiresAt < Date.now()) {
          VerificationModel.deleteone({ id: restaId })
            .then((result) => {
              RestaurantModel.deleteone({ _id: restaId })
                .then(() => {
                  let message =
                    "link hsa expired.please create resraurant agin ";
                  res.redirect(
                    `/restaurants/verified/?error=true&message=${message}`
                  );
                })
                .catch((error) => {
                  let message =
                    "clearing user with expired unique string failed ";
                  res.redirect(
                    `/restaurants/verified/?error=true&message=${message}`
                  );
                });
            })
            .catch((error) => {
              console.log(error);
              let message =
                "an error occurre while clearing  expired resraurant verification record";
              res.redirect(
                `/restaurants/verified/?error=true&message=${message}`
              );
            });
        } else {
          if (bcrypt.compare(uniqueString, hashedUniqueString)) {
            RestaurantModel.updateOne({ _id: restaId }, { verified: true })
              .then(() => {
                VerificationModel.deleteOne({ id: restaId })
                  .then(() => {
                    res.sendFile(
                      path.join(__dirname, "./../views/verifiedReataurant.html")
                    );
                  })
                  .catch((error) => {
                    console.log(error);
                    let message =
                      "an error occurre while finalizing sucssful verification  ";
                    res.redirect(
                      `/restaurants/verified/?error=true&message=${message}`
                    );
                  });
              })
              .catch((error) => {
                console.log(error);
                let message = "an error occurre while updating user verified ";
                res.redirect(
                  `/restaurants/verified/?error=true&message=${message}`
                );
              });
          } else {
            console.log(error);
            let message = "an error occurre while compering unique strings ";
            res.redirect(
              `/restaurants/verified/?error=true&message=${message}`
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
        let message =
          "an error occurre while checking for existing user Verification record ";
        res.redirect(`/restaurants/verified/?error=true&message=${message}`);
      });
  },
  verifiedRestaurant: async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/verifiedReataurant.html"));
  },
  getRestaurant: async (req, res) => {
    try {
      let { resId } = req.params;
      let data = await RestaurantModel.findOne({ _id: resId })
        .populate({ path: "menu", model: "itemmenus" })
        .populate({
          path: "orders",
          populate: {
            path: "orderItems",
            populate: {
              path: "itemMenuId",
              model: "itemmenus",
            },
            model: "itemorders",
          },
          model: "orders",
        })
        .populate({
          path: "tables",
          populate: {
            path: "orderID",
            model: "orders",
          },
          model: "tables",
        })
        .populate({ path: "workersArray", model: "users" });
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
  getRestaurantWorkers: async (req, res) => {
    try {
      let { resId } = req.params;
      let data = await RestaurantModel.findOne({ _id: resId })
      .populate({ path: "workersArray", model: "users" });
      res.json(data.workersArray);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
  getMyRestaurants: async (req, res) => {
    try {
      let data = await RestaurantModel.find({ creatorID: req.tokenData._id });
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
  getMyWorkPlaces: async (req, res) => {
    try {
      console.log(req.tokenData._id);
      let { worker } = await UserModel.findById(req.tokenData._id).populate({
        path: "worker.restaurantID",
        model: "restaurants",
      });
      res.json(worker.restaurantID);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
  editRestaurant: async (req, res) => {
    // console.log(req.body)
    let validBody = validateEditRestaurant(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }
    try {
      let editId = req.params.editId;

      let resUpdate = await RestaurantModel.updateOne(
        { _id: editId },
        req.body
      );
      res.json(resUpdate);
    } catch (err) {
      // console.log(err)
      res.status(500).json({ msg: "err", err });
    }
  },
  getCanvas: async (req, res) => {
    let { resId } = req.params;
    try {
      let data = await RestaurantModel.findOne({ _id: resId });
      res.json(data.tablesCanvas);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
  setCanvas: async (req, res) => {
    console.log(req.body);
    let validBody = validateTablesCanvas(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }

    let { resId } = req.params;

    // if (!req.body.canvas) return res.status(400).json({ msg: "Need to send canvas" });
    try {
      let data = await RestaurantModel.updateOne(
        { _id: resId },
        { tablesCanvas: req.body }
      );
      res.json(data);
    } catch (error) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
  addImageToGallery: async (req, res) => {
    console.log(req.body);
    // let validBody = validateTablesCanvas(req.body);
    if (!req.body.img) {
      return res.status(400).json({ msg: "Need to send imageUrl" });
    }

    let { resId } = req.params;

    // if (!req.body.canvas) return res.status(400).json({ msg: "Need to send canvas" });
    try {
      let data = await RestaurantModel.updateOne(
        { _id: resId },
        { $push: { "gallery.img": req.body.img } }
      );
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "err", err });
    }
  },
};
