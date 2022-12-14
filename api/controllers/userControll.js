const { UserModel } = require("../models/userModel");
const { validWorkerFillDetails, validUserEdit } = require("../validation/userValidation");
const bcrypt = require("bcrypt");


exports.userCtrl = {
  myInfo: async (req, res) => {
    try {
      
      let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  userInfo: async (req, res) => {
    let {userId} = req.params;
    try {
      let userInfo = await UserModel.findOne({ _id: userId });
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },

  //לנסות להקטין את כמות הבקשות מהשרת
  WorkerFillDetails: async (req, res) => {
    console.log(req.body)
    let validBody = validWorkerFillDetails(req.body);

    
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let workerId = req.params.workerId;
      let workerInfo = await UserModel.findOne({ _id: workerId })
      if(workerInfo.verified){
        return res.status(400).json({ msg: "User has already verified and filled in the details" })
      }
        let hashPass = await bcrypt.hash(req.body.password, 10);
        workerInfo.worker.pin = req.body.worker.pin
        workerInfo.phone = req.body.phone
        workerInfo.password = hashPass
        workerInfo.fullName = req.body.fullName
        workerInfo.verified=true;
        let workerUpdate = await UserModel.updateOne({ _id: workerId }, workerInfo)
  
        workerUpdate.password = "*******";
        console.log(workerUpdate);
        res.status(201).json(workerUpdate);
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
    if (!req.body.jobs) {
      return res.status(400).json({ msg: "Need to send job in body" });
    }
    try {
      let editId = req.params.editId;
      let userUpdate = await UserModel.updateOne({ _id: editId },{$set:{'worker.jobs':req.body.jobs}})
      console.log(userUpdate)
      res.json(userUpdate);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  //לוודא שלא מוחק פטים בזמן העדכון צריך לשלוח את כל המידע בערזרת ראוט  אחר 
  editUser: async (req, res) => {
    let validBody = validUserEdit(req.body);
    if (validBody.error) {
      return res.status(400).json({ msg: "Need to send body" });
    }
    try {
      let editId = req.params.editId;
      let userUpdate;
      console.log(editId)
      console.log(req.tokenData)
      if (req.tokenData.role == "admin") {
         userUpdate = await UserModel.updateOne({ _id: editId },req.body)
      }
      else if (req.tokenData._id == editId) {
         userUpdate = await UserModel.updateOne({ _id: editId },req.body)
      }
      req.tokenData.jobs.forEach(async job => {
        if (job == "manager") {
          console.log(job)

           userUpdate = await UserModel.updateOne({ _id: editId },req.body)
        }
        

      })
      console.log(userUpdate)
      res.json(userUpdate);
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

      console.log(delId);
      console.log(req.tokenData.role);
      if (req.tokenData.role == "admin") {
        userInfo = await UserModel.deleteOne({ _id: delId }, { password: 0 });
      }
      else if (req.tokenData._id == delId) {
        userInfo = await UserModel.deleteOne({ _id: req.tokenData._id }, { password: 0 });
      }
      req.tokenData.jobs.forEach(async job => {
        if (job == "manager") {
          userInfo = await UserModel.deleteOne({ _id: delId }, { password: 0 });
        }

      });
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  }
}