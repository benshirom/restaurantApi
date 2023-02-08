const express = require("express");
const { MenuCtrl } = require("../controllers/menuControll");
const { auth, authAdmin, authWorker, authManager, authWaiter, authChef } = require("../middlewares/auth");

const router = express.Router();

router.get("/:restId", MenuCtrl.getMenu)
router.post("/create/:restId", authChef, MenuCtrl.createItemMenu)
router.patch("/remove/:restId/:itemId", authChef, MenuCtrl.removeItemMenu)
router.patch("/edit/:editItemId", authChef, MenuCtrl.editItemMenu)
// router.patch("/editcategory/:editItemId", authManager, MenuCtrl.editCategoryItemMenu)
// router.patch("/editsubcategory/:editItemId", authManager, MenuCtrl.editSubcategoryItemMenu)



module.exports = router; 