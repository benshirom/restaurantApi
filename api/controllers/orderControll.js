const { RestaurantModel } = require("../models/restaurantModel");
const { orderModel } = require("../models/orderModel");
const { itemOrderModel } = require('../models/itemOrderModel');
const { validateOrderByWorker, validateOrderByCustumer } = require("../validation/orderValidation");
const { validateItemOrder } = require("../validation/itemOrderValidation");

exports.OrderCtrl = {
 
  


    getOrders: async (req, res) => {
      let { restId } = req.params;
      
      let perPage = req.query.perPage || 50;
      let page = req.query.page || 1;
      let sort = req.query.sort || "_id"
      let reverse = req.query.reverse == "yes" ? -1 : 1;
      let active = req.query.active;
      let ownerType = req.query.ownerType;
      let orderType = req.query.orderType;
      console.log(active)
      // Create filter object for the match option
      let filter = { $and: [] };
      // Filter by active state
      if (active == "t") {
        filter.$and.push({ active: true });
      } else if (active === "f") {
        filter.$and.push({ active: false });
      }else if (active === "b") {
        filter.$and.push({ $or: [{ active: true }, { active: false }] });
      }
      
      // Filter by order type
      if (orderType === "table") {
        filter.$and.push({ isTA: false, "byCustumer.isDelivery": false });
      } else if (orderType === "delivery") {
        filter.$and.push({ "byCustumer.isDelivery": true });
      } else if (orderType === "T.A") {
        filter.$and.push({ isTA: true });
      } else if (orderType === "both") {
        filter.$and.push({ $or: [{ isTA: false, "byCustumer.isDelivery": false }, { "byCustumer.isDelivery": true }, { isTA: true }] });
      }
      
      // Filter by owner type
      if (ownerType === "customer") {
        filter.$and.push({ "byCustumer.custumerID": { $ne: null } });
      } else if (ownerType === "worker") {
        filter.$and.push({ "byWorker.workerID": { $ne: null } });
      } else if (ownerType === "both") {
        filter.$and.push({ $or: [{ "byCustumer.custumerID": { $ne: null } }, { "byWorker.workerID": { $ne: null } }] });
      }
      
      // Set default filter if none of the query parameters were specified
      if (filter.$and.length === 0) {
        filter = {};
      } try {
        console.log(filter);
        let {orders} = await RestaurantModel.findOne({ _id: restId }).populate({
          path: "orders",
          match: filter,
          options: {
            limit: perPage,
            sort: { [sort]: reverse },
            
          },populate: {
            path: 'orderItems', populate: {
              path: 'itemMenuId', model: 'itemmenus'

            },
            model: 'itemorders'
          },
              model: "orders"
            });
            
        res.json(orders);
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err });
      }
    }
  ,
  // getOrders: async (req, res) => {

  //   let { restId } = req.params;
  //   // try {
  //   //   let restaurant = await RestaurantModel.findOne({ _id: restId }).populate({
  //   //     path: "orders",
  //   //     model: "orders",
  //   //   });
  //   //   res.json(restaurant.orders);
    
  //   // }
  //   let perPage = req.query.perPage || 50;
  //   let page = req.query.page || 1;
  //   let sort = req.query.sort || "_id"
  //   let reverse = req.query.reverse == "yes" ? -1 : 1;
  //   let isActive = req.query.active == "yes" ? true : false;
  //   try {
  //     let queryS = req.query.s;
  //     let searchReg = new RegExp(queryS, "i")
  //     let {orders} = await RestaurantModel.findOne({ _id: restId }).populate({
  //           path: "orders",
  //           match: {$and:[{active:isActive},{'byCustumer.custumerID':null}]},
  //           options: {
  //             limit: perPage,
  //             sort: { [sort]: reverse },

  //           },
  //           model: "orders",
  //         })
  //       // .limit(perPage)
  //       // .skip((page - 1) * perPage)
  //       // .sort({ [sort]: reverse })
  //     res.json(orders);
  //   }
  //    catch (err) {
  //     console.log(err);
  //     res.status(500).json({ msg: "there error try again later", err });
  //   }
  // },
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
      res.json(newOrder);
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
      let resta = await RestaurantModel.updateOne({ _id: restId },{ $push: { 'orders': newOrder._id } });
      res.json(resta);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err });
    }
  },
  addItemToOrder: async (req, res) => {
    let validBody = validateItemOrder(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }
    try {
      let { orderId,itemMenuId } = req.params;

      let item = new itemOrderModel(req.body);
      item.itemMenuId=itemMenuId
      await item.save()
      let order = await orderModel.updateOne({ _id: orderId },{ $push: { 'orderItems': item._id },$inc: { 'finalPrice': item.price }});
      res.json(order);

    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err });
    }
   

  }
  // addOrderDeliveryOrTA: async (req, res) => {},
};
