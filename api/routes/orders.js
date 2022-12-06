const express = require("express");
const { OrderCtrl } = require("../controllers/orderControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

router.get("/" ,authWorker,OrderCtrl.getOrders)
router.post("/:resId" ,authWorker,OrderCtrl.addOrderByWorker)
router.post("/:custumerID" ,auth,OrderCtrl.addOrderDeliveryOrTA) 
// router.post("/payOrder" ,auth,OrderCtrl.payOnOrder)
// router.post("/discount/:orderId" ,authManager,OrderCtrl.discountOnOrder)
// router.post("/" ,auth,OrderCtrl.addOrderByCustomer) 



module.exports = router;