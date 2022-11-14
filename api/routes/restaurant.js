const express = require("express");
const { restaurantCtl } = require("../controllers/toyControll");
const { auth, authAdmin } = require("../middlewares/auth");
const router = express.Router();

router.get("/" ,auth,restaurantCtl.getRestaurant)

// /toys/?s=
router.get("/search" ,toyCtrl.searchToy)

router.get("/category" ,toyCtrl.catToy)

router.post("/", auth, toyCtrl.addToy)


router.put("/:editId", auth,toyCtrl.editToy)
                      
router.delete("/:delId", auth, toyCtrl.deleteToy)

module.exports = router;