const express = require("express");
const { MenuCtrl } = require("../controllers/menuControll");
const { auth, authAdmin, authWorker, authManager, authWaiter } = require("../middlewares/auth");

const router = express.Router();

router.get("/:restId", MenuCtrl.getMenu)
router.post("/create/:restId", authManager, MenuCtrl.createItemMenu)
router.patch("/remove/:restId/:itemId", authManager, MenuCtrl.removeItemMenu)
router.patch("/edit/:editItemId", authManager, MenuCtrl.editItemMenu)
// router.patch("/editcategory/:editItemId", authManager, MenuCtrl.editCategoryItemMenu)
// router.patch("/editsubcategory/:editItemId", authManager, MenuCtrl.editSubcategoryItemMenu)



module.exports = router; 