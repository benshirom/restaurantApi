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
