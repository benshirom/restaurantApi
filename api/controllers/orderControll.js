const { RestaurantModel } = require("../models/restaurantModel");
const { TableModel } = require("../models/tableModel");
const { OrderModel } = require("../models/orderModel");


exports.OrderCtrl={
    getOrders:function(req,res){



    },
    addOrderByWorker: async (req, res) => {
        try {
            let {tableId}= req.params;
            let table =TableModel.find(tableId)
            res.json(table)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
  

    },
    addOrderByCustomer: async (req, res) => {},
    addOrderDeliveryOrTA: async (req, res) => {},

}
