const express = require("express");
const { restaurantCtl } = require("../controllers/restaurantControll");
const { workerCtl } = require("../controllers/workerControll");
const { menuCtl } = require("../controllers/menuControll");
const { oderCtl } = require("../controllers/oderControll");
const { auth, authAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/" ,auth,restaurantCtl.getRestaurant)
router.put("/:editId", auth,restaurantCtl.editrestaurant)
router.get("/" ,restaurantCtl.shifts)
router.post("/shifts/addShist" ,restaurantCtl.addShifts)
router.get("/getPaymentCalculation" ,auth,restaurantCtl.getRestaurantPaymentCalculation)
router.get("/" ,auth,restaurantCtl.getTable)

router.post("/", authAdmin, workerCtl.addworker)
router.delete("/:delId", auth, workerCtl.deleteWorker)
router.put("/:editId", authAdmin,workerCtl.editWorker)

router.get("/" ,auth,oderCtl.getOrder)
router.post("/order" ,auth,oderCtl.addOrder)
router.post("/payOrder" ,auth,oderCtl.payOnOrder)
router.post("/discount" ,auth,oderCtl.discountOnOrder)

router.get("/" ,auth,menuCtl.getMenu)
router.post("/", authAdmin, menuCtl.addItemMenu)
router.delete("/:delItemId", auth, menuCtl.deleteItemMenu)
router.put("/:editItemId", authAdmin,menuCtl.editItemMenu)

    

module.exports = router;