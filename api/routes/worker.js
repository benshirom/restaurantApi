const express= require("express");
const {auth, authAdmin} = require("../middlewares/auth");
const { authCtrl } = require("../controllers/authControll");
const { userCtrl } = require("../controllers/userControll");
const router = express.Router();

// אזור שמחזיר למשתמש את הפרטים שלו לפי הטוקן שהוא שולח
router.get("/myInfo",auth,userCtrl.myInfo)
// רק משתמש אדמין יוכל להגיע ולהציג את רשימת 
// כל המשתמשים

router.get("/usersList", authAdmin ,userCtrl.userList)
router.post("/",authCtrl.signUp)
router.post("/login", authCtrl.login)

module.exports = router;
