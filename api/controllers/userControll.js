const { UserModel } = require("../models/userModel");


exports.userCtrl = {
  myInfo: async (req, res) => {
    try {
      //,{name:1,email:1}
      let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  WorkerFillDetails: async (req, res) => {
    let validBody = validWorkerFillDetails(req.body);
    // במידה ויש טעות בריק באדי שהגיע מצד לקוח
    // יווצר מאפיין בשם אירור ונחזיר את הפירוט של הטעות
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let workerId = req.params.workerId;
      let hashPass = await bcrypt.hash(req.body.password, 10);
      let workerInfo = UserModel.updateOne({ _id: workerId }, {
        role: req.body.role,
        fullName: {
          firstName: req.body.fullName.firstName,
          lastName: req.body.fullName.lastName
        },
        phone: req.body.phone,
        password:hashPass,
        worker:{pin:req.body.worker.pin}
          })
      // נרצה להצפין את הסיסמא בצורה חד כיוונית
      // 10 - רמת הצפנה שהיא מעולה לעסק בינוני , קטן
      workerInfo.password = "*******";

      res.status(201).json(workerInfo);
    }
    catch (err) {
      if (err.code == 11000) {
        return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

      }
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }
  },
   userList: async (req, res) => {
    try {
      let data = await UserModel.find({}, { password: 0 });
      res.json(data)
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  deleteUser: async (req, res) => {
    try {
      let delId = req.params.delId;
      let userInfo;
    

      if (req.tokenData.role == "admin") {
        userInfo = await UserModel.deleteOne({ _id: delId }, { password: 0 });
      }
      else if (req.tokenData._id == delId) {
        userInfo = await UserModel.deleteOne({ _id: req.tokenData._id }, { password: 0 });
      }
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  }
}