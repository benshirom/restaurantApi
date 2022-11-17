const { UserModel } = require("../models/userModel");
const { validWorkerFillDetails} = require("../validation/userValidation");
const bcrypt = require("bcrypt");


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
      req.body.password=hashPass;
      let workerInfo = await UserModel.findOneAndUpdate({ _id: workerId }, req.body)
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
  editWorkerJob: async (req, res) => {
    if (!req.body.worker) {
      return res.status(400).json({ msg: "Need to send role in body" });
    }
    try {
      let editId = req.params.editId;
      // if (editId == "636a21fb08ceefdb79d7ea62" || editId == "636a5789fcf2f9da509ae586") {
      //   return res.status(401).json({ msg: "You cant change superadmin to user" });
      // }
      let userInfo = await UserModel.updateOne({ _id: editId }, { worker: { jobs: req.body.worker.jobs } });

      res.json(userInfo);
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