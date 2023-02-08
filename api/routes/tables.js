const express = require("express");

const { TableCtrl } = require("../controllers/tableControll");
const { auth, authAdmin, authWorker, authManager, authWaiter, authShiftManager } = require("../middlewares/auth");

const router = express.Router();

router.get("/:tableID" ,authWorker,TableCtrl.getTable) 

router.patch("/create/:restId" ,authShiftManager,TableCtrl.createNewTable) 
router.delete("/remove/:restId/:tableId" ,authShiftManager,TableCtrl.removeTableFromRestaurant) 
router.patch("/edit/:editTableId", authShiftManager, TableCtrl.editTable)
router.patch("/editOrderID/:editTableId/:orderID", authShiftManager, TableCtrl.editOrderID)
// router.patch("/location/:editTableId", authManager, TableCtrl.editLocation)
// router.patch("/tableOwenr/:editTableId/:orderId", authManager, TableCtrl.editTableOwenr)





module.exports = router;