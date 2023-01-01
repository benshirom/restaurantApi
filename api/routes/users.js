const express= require("express");
const {auth, authAdmin, authManager, authWorker} = require("../middlewares/auth");
const { authCtrl } = require("../controllers/authControll");
const { userCtrl } = require("../controllers/userControll");
const router = express.Router();

// אזור שמחזיר למשתמש את הפרטים שלו לפי הטוקן שהוא שולח
router.get("/myInfo",auth,userCtrl.myInfo)
router.get("/userInfo/:userId",authManager,userCtrl.userInfo)
// רק משתמש אדמין יוכל להגיע ולהציג את רשימת 
// כל המשתמשים
router.post("/login", authCtrl.login)
router.post("/",authCtrl.signUp)

router.put("/userEdit/:editId", auth, userCtrl.editUser)
router.delete("/:delId", auth, userCtrl.deleteUser)
router.get("/checkToken", auth, userCtrl.checkToken)

router.post("/manager",authCtrl.signUpManager)

router.post("/worker/:restId",authManager,authCtrl.signUpWorker)
router.patch("/worker/:workerId",userCtrl.WorkerFillDetails)
router.patch("/changeJob/:editId", authManager, userCtrl.editWorkerJob)
router.patch("/editUser/:editId", authWorker, userCtrl.editUser)
router.delete("/deleteWorker/:delId/:restId", authManager, userCtrl.deleteWorker)
//ערכיבה למנהל ועריכה לעובד 



router.get("/verify/:userId/:uniqueString",authCtrl.verifyUser)
router.get("/verified",authCtrl.verifiedUser)

router.post("/requestPasswordReset",authCtrl.requestPasswordReset)
router.post("/resetPassword", authCtrl.resetPassword)


router.get("/usersList", authAdmin ,userCtrl.userList)


module.exports = router;
