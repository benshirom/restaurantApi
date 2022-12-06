const express = require("express");
const { RestaurantCtrl } = require("../controllers/restaurantControll");
const { WorkerCtrl } = require("../controllers/workerControll");
const { MenuCtrl } = require("../controllers/menuControll");
const { OrderCtrl } = require("../controllers/orderControll");
const { TableCtrl } = require("../controllers/tableControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

router.get("/verify/:restaId/:uniqueString", RestaurantCtrl.verifyRestaurant)
router.get("/verified", RestaurantCtrl.verifiedRestaurant)

router.post("/create", authManager, RestaurantCtrl.createRestaurant)
router.get("/byId/:resId", authWorker, RestaurantCtrl.getRestaurant) 
router.get("/myrestaurants", authManager, RestaurantCtrl.getMyRestaurants)
router.get("/myworks", authWorker, RestaurantCtrl.getMyWorkPlaces)
router.put("/editRest/:editId", authManager, RestaurantCtrl.editRestaurant)

// router.get("/shifts" ,authWorker,RestaurantCtrl.shifts)
// router.post("/shifts/addShist" ,RestaurantCtrl.addShifts)
// router.get("/getPaymentCalculation" ,authManager,RestaurantCtrl.getRestaurantPaymentCalculation)
// לדבר עם ירין על שלושתם


router.get("/orders" ,authWorker,OrderCtrl.getOrders)
router.post("/orders/:resId" ,authWorker,OrderCtrl.addOrderByWorker)
router.post("/orders/:custumerID" ,auth,OrderCtrl.addOrderDeliveryOrTA) 
// router.post("/orders/payOrder" ,auth,OrderCtrl.payOnOrder)
// router.post("/orders/discount/:orderId" ,authManager,OrderCtrl.discountOnOrder)
// router.post("/orders" ,auth,OrderCtrl.addOrderByCustomer) 


// router.get("/tables" ,authWorker,TableCtrl.getTables) 
router.post("/tables/create" ,authManager,TableCtrl.createNewTable) 
router.patch("/tables/add/:restId/:tableId" ,authManager,TableCtrl.addTableToRestaurant) 
router.patch("/tables/remove/:restId/:tableId" ,authManager,TableCtrl.removeTableFromRestaurant) 
router.delete("/tables/delete/:delTableId" ,authManager,TableCtrl.deleteTable) 
router.patch("/tables/edit/:editTableId", authManager, TableCtrl.editTable)
router.patch("/tables/editIsCatched/:editTableId", authManager, TableCtrl.editIsCatched)
router.patch("/tables/location/:editTableId", authManager, TableCtrl.editLocation)
router.patch("/tables/tableOwenr/:editTableId/:orderId", authManager, TableCtrl.editTableOwenr)

router.get("/menu/:restId", MenuCtrl.getMenu)
router.post("/menu/create/:restId", authManager, MenuCtrl.createItemMenu)
router.patch("/menu/remove/:restId/:itemId", authManager, MenuCtrl.removeItemMenu)
router.patch("/menu/edit/:editItemId", authManager, MenuCtrl.editItemMenu)
router.patch("/menu/editcategory/:editItemId", authManager, MenuCtrl.editCategoryItemMenu)
router.patch("/menu/editsubcategory/:editItemId", authManager, MenuCtrl.editSubcategoryItemMenu)


// router.put("/Staff/:editId", authManager,WorkerCtrl.editWorker)


module.exports = router;