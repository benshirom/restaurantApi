const { RestaurantModel } = require("../models/restaurantModel");
const { TableModel } = require("../models/tableModel");
const { OrderModel } = require("../models/orderModel");

exports.OrderCtrl = {
  getOrders: async (req, res) => {
    let { resId } = req.params;
    try {
      let restaurant = await RestaurantModel.findOne({ _id: resId }).populate({
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

    let { resId } = req.params;

    try {
      let addOrder = await RestaurantModel(
        { _id: resId },{ $push: { 'orders': req.body } }
      );

      res.json(addOrder);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err });
    }
  },

  addOrderByCustomer: async (req, res) => {},
  addOrderDeliveryOrTA: async (req, res) => {},
};
