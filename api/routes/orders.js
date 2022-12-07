const express = require("express");
const { OrderCtrl } = require("../controllers/orderControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

router.get("/:restId" ,authWorker,OrderCtrl.getOrders)
router.post("/addByWorker/:restId" ,authWorker,OrderCtrl.addOrderByWorker)
router.post("/addByCustomer/:restId" ,auth,OrderCtrl.addOrderByCustomer) 
// router.post("/payOrder" ,auth,OrderCtrl.payOnOrder)
// router.post("/discount/:orderId" ,authManager,OrderCtrl.discountOnOrder)
// router.post("/" ,auth,OrderCtrl.addOrderByCustomer) 



module.exports = router;