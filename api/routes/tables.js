const express = require("express");

const { TableCtrl } = require("../controllers/tableControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

// router.get("/tables" ,authWorker,TableCtrl.getTables) 

router.patch("/create/:restId" ,authManager,TableCtrl.createNewTable) 
router.delete("/remove/:restId/:tableId" ,authManager,TableCtrl.removeTableFromRestaurant) 
router.patch("/edit/:editTableId", authManager, TableCtrl.editTable)
router.patch("/editOrderID/:editTableId/:orderID", authManager, TableCtrl.editOrderID)
router.patch("/location/:editTableId", authManager, TableCtrl.editLocation)
// router.patch("/tableOwenr/:editTableId/:orderId", authManager, TableCtrl.editTableOwenr)





module.exports = router;