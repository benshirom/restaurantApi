const express= require("express");
const {auth, authAdmin} = require("../middlewares/auth");
const { authCtrl } = require("../controllers/authControll");
const { userCtrl } = require("../controllers/userControll");
const router = express.Router();

// אזור שמחזיר למשתמש את הפרטים שלו לפי הטוקן שהוא שולח
router.get("/myInfo",auth,userCtrl.myInfo)
// רק משתמש אדמין יוכל להגיע ולהציג את רשימת 
// כל המשתמשים
router.post("/",authCtrl.signUp)
router.post("/manager",authCtrl.signUpManager)
router.post("/worker",authCtrl.signUpWorker)
router.patch("/worker/:workerId",userCtrl.WorkerFillDetails)
router.post("/login", authCtrl.login)

router.get("/usersList", authAdmin ,userCtrl.userList)
router.patch("/changeJob/:editId", authAdmin, userCtrl.editWorkerJob)
router.delete("/:delId", auth, userCtrl.deleteUser)

router.get("/verify/:userId/:uniqueString",authCtrl.verifyUser)
router.get("/verified",authCtrl.verifiedUser)
// router.delete("/:delId", auth, userCtrl.deleteUser)



module.exports = router;
