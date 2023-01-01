const express = require("express");
const { RestaurantCtrl } = require("../controllers/restaurantControll");
const { WorkerCtrl } = require("../controllers/workerControll");

const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

router.get("/verify/:restaId/:uniqueString", RestaurantCtrl.verifyRestaurant)
router.get("/verified", RestaurantCtrl.verifiedRestaurant)

router.post("/create", authManager, RestaurantCtrl.createRestaurant)
router.get("/byId/:resId", authWorker, RestaurantCtrl.getRestaurant) 
router.get("/myrestaurants", authManager, RestaurantCtrl.getMyRestaurants)
router.get("/myworks", authWorker, RestaurantCtrl.getMyWorkPlaces)
router.put("/editRest/:editId", authManager, RestaurantCtrl.editRestaurant)
router.get("/getCanvas/:resId",authWorker,RestaurantCtrl.getCanvas)
router.patch("/setCanvas/:resId",authManager,RestaurantCtrl.setCanvas)
router.patch("/addimage/:resId",authManager,RestaurantCtrl.addImageToGallery)
// router.get("/shifts" ,authWorker,RestaurantCtrl.shifts)
// router.post("/shifts/addShist" ,RestaurantCtrl.addShifts)
// router.get("/getPaymentCalculation" ,authManager,RestaurantCtrl.getRestaurantPaymentCalculation)
// לדבר עם ירין על שלושתם





// router.put("/Staff/:editId", authManager,WorkerCtrl.editWorker)


module.exports = router;