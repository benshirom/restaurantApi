const express = require("express");
const { RestaurantCtrl } = require("../controllers/restaurantControll");
const { WorkerCtrl } = require("../controllers/workerControll");
const { MenuCtrl } = require("../controllers/menuControll");
const { OrderCtrl } = require("../controllers/oderControll");
const { auth, authAdmin } = require("../middlewares/auth");

const router = express.Router();



router.get("/" ,auth,RestaurantCtrl.getRestaurant)
router.put("/:editId", auth,RestaurantCtrl.editrestaurant)
router.get("/" ,RestaurantCtrl.shifts)
router.post("/shifts/addShist" ,RestaurantCtrl.addShifts)
router.get("/getPaymentCalculation" ,auth,RestaurantCtrl.getRestaurantPaymentCalculation)
router.get("/" ,auth,RestaurantCtrl.getTable)



router.post("/", authAdmin, WorkerCtrl.addworker)
router.delete("/:delId", auth, WorkerCtrl.deleteWorker)
router.put("/:editId", authAdmin,WorkerCtrl.editWorker)


router.get("/" ,auth,OrderCtrl.getOrder)
router.post("/order" ,auth,OrderCtrl.addOrder)
router.post("/payOrder" ,auth,OrderCtrl.payOnOrder)
router.post("/discount" ,auth,OrderCtrl.discountOnOrder)

router.get("/" ,auth,MenuCtrl.getMenu)
router.post("/", authAdmin, MenuCtrl.addItemMenu)
router.delete("/:delItemId", auth, MenuCtrl.deleteItemMenu)
router.put("/:editItemId", authAdmin,MenuCtrl.editItemMenu)

    

module.exports = router;