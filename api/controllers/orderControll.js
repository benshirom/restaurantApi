const { RestaurantModel } = require("../models/restaurantModel");
const { TableModel } = require("../models/tableModel");
const { orderModel } = require("../models/orderModel");
const { validateOrderByWorker, validateOrderByCustumer } = require("../validation/orderValidation");

exports.OrderCtrl = {
  getOrders: async (req, res) => {
    let { restId } = req.params;
    try {
      let restaurant = await RestaurantModel.findOne({ _id: restId }).populate({
        path: "orders",
        model: "orders",
      });
      res.json(restaurant.orders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err });
    }
  },
  // searchOrders: async (req, res) => {
  //   let perPage = req.query.perPage || 10;
  //   let page = req.query.page || 1;

  //   try {
  //     let queryC = req.query.c
  //     let queryS = req.query.s;
  //     // מביא את החיפוש בתור ביטוי ולא צריך את כל הביטוי עצמו לחיפוש
  //     // i -> מבטל את כל מה שקשור ל CASE SENSITVE
  //     let searchReg = new RegExp(queryS, "i")
  //     let data = await orderModel.find({ $or: [{ name: searchReg }, { info: searchReg }] })
  //       .limit(perPage)
  //       .skip((page - 1) * perPage)
  //       .sort({ _id: -1 })
  //     res.json(data);
  //   }
  //   catch (err) {
  //     console.log(err);
  //     res.status(500).json({ msg: "there error try again later", err })
  //   }
  // },
  addOrderByWorker: async (req, res) => {
    let validBody = validateOrderByWorker(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }

    try {
      let { restId } = req.params;
      let newOrder = new orderModel(req.body);
      newOrder.byWorker.workerID = req.tokenData._id;
      await newOrder.save();

      let orders = await RestaurantModel.updateOne({ _id: restId },{ $push: { 'orders': newOrder._id } }
      );
      res.json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err });
    }
  },

  addOrderByCustomer: async (req, res) => {
    let validBody = validateOrderByCustumer(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }

    try {
      let { restId } = req.params;
      let newOrder = new orderModel(req.body);
      newOrder.byCustumer.custumerID = req.tokenData._id;
      await newOrder.save();
      let orders = await RestaurantModel.updateOne({ _id: restId },{ $push: { 'orders': newOrder._id } }
      );
      res.json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err });
    }
  },
  // addOrderDeliveryOrTA: async (req, res) => {},
};
