const express = require("express");
const { RestaurantCtrl } = require("../controllers/restaurantControll");
const { WorkerCtrl } = require("../controllers/workerControll");
const { MenuCtrl } = require("../controllers/menuControll");
const { OrderCtrl } = require("../controllers/orderControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();



router.post("/create", authManager, RestaurantCtrl.createRestaurant)
router.get("/verify/:restaId/:uniqueString", RestaurantCtrl.verifyRestaurant)
router.get("/verified", RestaurantCtrl.verifiedRestaurant)

router.get("/byId/:resId", authWorker, RestaurantCtrl.getRestaurant)
router.get("/myrestaurants/:userID", authManager, RestaurantCtrl.getMyRestaurants)
router.get("/myworks", authWorker, RestaurantCtrl.getMyWorkPlaces)
router.put("/editRest/:editId", authManager, RestaurantCtrl.editRestaurant)

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

router.get("/menu", MenuCtrl.getMenu)
router.post("/menu/create", authManager, MenuCtrl.createItemMenu)
router.post("/menu/add/:restId/:itemId", authManager, MenuCtrl.addItemMenu)
router.patch("/menu/remove/:restId/:itemId", authManager, MenuCtrl.removeItemMenu)
router.delete("/menu/delete/:delItemId", authManager, MenuCtrl.deleteItemMenu)
router.patch("/menu/edit/:editItemId", authManager, MenuCtrl.editItemMenu)
router.patch("/menu/editcategory/:editItemId", authManager, MenuCtrl.editCategoryItemMenu)
router.patch("/menu/editsubcategory/:editItemId", authManager, MenuCtrl.editSubategoryItemMenu)



module.exports = router;