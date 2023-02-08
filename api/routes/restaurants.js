const express = require("express");
const { RestaurantCtrl } = require("../controllers/restaurantControll");
const { WorkerCtrl } = require("../controllers/workerControll");

const { auth, authAdmin, authWorker, authManager, authWaiter, authShiftManager } = require("../middlewares/auth");

const router = express.Router();

router.get("/verify/:restaId/:uniqueString", RestaurantCtrl.verifyRestaurant)
router.get("/verified", RestaurantCtrl.verifiedRestaurant)

router.post("/create", authManager, RestaurantCtrl.createRestaurant)
router.get("/byId/:resId", authWorker, RestaurantCtrl.getRestaurant) 
router.get("/workersArr/:resId", authManager, RestaurantCtrl.getRestaurantWorkers) 
router.get("/myrestaurants", authManager, RestaurantCtrl.getMyRestaurants)
router.get("/myworks", authWorker, RestaurantCtrl.getMyWorkPlaces)
router.patch("/editRest/:editId", authManager, RestaurantCtrl.editRestaurant)
router.get("/getCanvas/:resId",authWorker,RestaurantCtrl.getCanvas)
router.patch("/setCanvas/:resId",authShiftManager,RestaurantCtrl.setCanvas)
router.patch("/addimage/:resId",authManager,RestaurantCtrl.addImageToGallery)
router.patch("/setShifts/:resId",authManager,RestaurantCtrl.setShifts)
// router.get("/shifts" ,authWorker,RestaurantCtrl.shifts)
// router.post("/shifts/addShist" ,RestaurantCtrl.addShifts)
// router.get("/getPaymentCalculation" ,authManager,RestaurantCtrl.getRestaurantPaymentCalculation)
// לדבר עם ירין על שלושתם





// router.put("/Staff/:editId", authManager,WorkerCtrl.editWorker)


module.exports = router;