const express= require("express");
const {auth, authAdmin, authManager} = require("../middlewares/auth");
const { authCtrl } = require("../controllers/authControll");
const { userCtrl } = require("../controllers/userControll");
const router = express.Router();

// אזור שמחזיר למשתמש את הפרטים שלו לפי הטוקן שהוא שולח
router.get("/myInfo",auth,userCtrl.myInfo)
router.get("/myInfo/:userId",authManager,userCtrl.userInfo)
// רק משתמש אדמין יוכל להגיע ולהציג את רשימת 
// כל המשתמשים
router.post("/",authCtrl.signUp)
router.post("/manager",authCtrl.signUpManager)
router.post("/worker/:restId",authManager,authCtrl.signUpWorker)
router.patch("/worker/:workerId",userCtrl.WorkerFillDetails)
router.post("/login", authCtrl.login)

router.patch("/changeJob/:editId", authManager, userCtrl.editWorkerJob)
router.put("/userEdit/:editId", auth, userCtrl.editUser)
router.delete("/:delId", auth, userCtrl.deleteUser)

router.get("/verify/:userId/:uniqueString",authCtrl.verifyUser)
router.get("/verified",authCtrl.verifiedUser)




router.get("/usersList", authAdmin ,userCtrl.userList)


module.exports = router;
