const express = require("express");

const { TableCtrl } = require("../controllers/tableControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

// router.get("/tables" ,authWorker,TableCtrl.getTables) 

router.post("/create" ,authManager,TableCtrl.createNewTable) 
router.patch("/add/:restId/:tableId" ,authManager,TableCtrl.addTableToRestaurant) 
router.patch("/remove/:restId/:tableId" ,authManager,TableCtrl.removeTableFromRestaurant) 
router.delete("/delete/:delTableId" ,authManager,TableCtrl.deleteTable) 
router.patch("/edit/:editTableId", authManager, TableCtrl.editTable)
router.patch("/editIsCatched/:editTableId", authManager, TableCtrl.editIsCatched)
router.patch("/location/:editTableId", authManager, TableCtrl.editLocation)
router.patch("/tableOwenr/:editTableId/:orderId", authManager, TableCtrl.editTableOwenr)





module.exports = router;