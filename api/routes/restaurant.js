const express = require("express");
const { RestaurantCtrl } = require("../controllers/restaurantControll");
const { WorkerCtrl } = require("../controllers/workerControll");
const { MenuCtrl } = require("../controllers/menuControll");
const { OrderCtrl } = require("../controllers/orderControll");
const { auth, authAdmin,authWorker,authManager,authWaiter } = require("../middlewares/auth");

const router = express.Router();



// router.get("/" ,authWorker,RestaurantCtrl.getRestaurant)
// router.put("/:editId", authManager,RestaurantCtrl.editrestaurant)
// router.get("/shifts" ,authWorker,RestaurantCtrl.shifts)
// router.post("/shifts/addShist" ,RestaurantCtrl.addShifts)
// router.get("/getPaymentCalculation" ,authManager,RestaurantCtrl.getRestaurantPaymentCalculation)
// router.get("/tables" ,auth,RestaurantCtrl.getTable)



// router.post("/Staff", authManager, WorkerCtrl.addworker)
// router.delete("/Staff/:delId", authManager, WorkerCtrl.deleteWorker)
// router.put("/Staff/:editId", authManager,WorkerCtrl.editWorker)


// router.get("/orders" ,authWorker,OrderCtrl.getOrder)
// router.post("/orders" ,authWorker,OrderCtrl.addOrder)
// router.post("/orders/payOrder" ,auth,OrderCtrl.payOnOrder)
// router.post("/orders/discount/:orderId" ,authManager,OrderCtrl.discountOnOrder)

// router.get("/Menu" ,MenuCtrl.getMenu)
// router.post("/Menu", authManager, MenuCtrl.addItemMenu)
// router.delete("Menu/:delItemId", authManager, MenuCtrl.deleteItemMenu)
// router.put("Menu/:editItemId", authManager,MenuCtrl.editItemMenu)

    

module.exports = router;