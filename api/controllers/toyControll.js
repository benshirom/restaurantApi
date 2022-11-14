const { ToyModel } = require("../models/toyModel");
const { validateToy } = require("../validation/toyValidation");

exports.toyCtrl = {
  searchToy: async (req, res) => {
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;

    try {
      let queryS = req.query.s;
      // מביא את החיפוש בתור ביטוי ולא צריך את כל הביטוי עצמו לחיפוש
      // i -> מבטל את כל מה שקשור ל CASE SENSITVE
      let searchReg = new RegExp(queryS, "i")
      let data = await ToyModel.find({ $or: [{ name: searchReg }, { info: searchReg }] })
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ _id: -1 })
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
    }
  },
  catToy: async (req, res) => {
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;

    try {
      let queryS = req.query.c;
      // מביא את החיפוש בתור ביטוי ולא צריך את כל הביטוי עצמו לחיפוש
      // i -> מבטל את כל מה שקשור ל CASE SENSITVE
      let searchReg = new RegExp(queryS, "i")
      let data = await ToyModel.find({  category: searchReg })
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ _id: -1 })
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
    }
  },
  fillToy: async (req, res) => {
    let perPage = req.query.perPage || 10;
    let page = req.query.page || 1;

    try {
      let data = await ToyModel.find({})
        .limit(perPage)
        .skip((page - 1) * perPage)
        .sort({ _id: -1 })
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
    }
  },
  // בקשה לפי קטגוריה להוסיף
  addToy: async (req, res) => {
    let validBody = validateToy(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let toy = new ToyModel(req.body);
      // add the user_id of the user that add the toy
      toy.user_id = req.tokenData._id;
      await toy.save();
      res.status(201).json(toy);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
    }
  },
  editToy: async (req, res) => {
    let validBody = validateToy(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let editId = req.params.editId;
      let data;
      if (req.tokenData.role == "admin") {
        data = await ToyModel.updateOne({ _id: editId }, req.body)
      }
      else {
        data = await ToyModel.updateOne({ _id: editId, user_id: req.tokenData._id }, req.body)
      }
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
    }
  },
  deleteToy: async (req, res) => {
    try {
      let delId = req.params.delId;
      let data;
      // אם אדמין יכול למחוק כל רשומה אם לא בודק שהמשתמש
      // הרשומה היוזר איי די שווה לאיי די של המשתמש
      if (req.tokenData.role == "admin") {
        data = await ToyModel.deleteOne({ _id: delId })
      }
      else {
        data = await ToyModel.deleteOne({ _id: delId, user_id: req.tokenData._id })
      }
      res.json(data);
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
    }
  }
};