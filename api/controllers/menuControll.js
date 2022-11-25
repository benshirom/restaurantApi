const { RestaurantModel } = require("../models/restaurantModel");
const { UserModel } = require("../models/userModel");
const { itemMenuModel } = require("../models/itemMenuModel");
const { validateItemMenu,validateEditItemMenu } = require("../validation/itemMenuValidation");


exports.MenuCtrl = {
    getMenu: async (req, res) => {
        let { restId } = req.params
        try {
            let restaurant = await RestaurantModel.findOne({ _id: restId }).populate('menu');

            res.json(restaurant.menu)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    createItemMenu: async (req, res) => {
        let validBody = validateItemMenu(req.body);

        if (validBody.error) return res.status(400).json(validBody.error.details);
        // let {workId}= req.params
        try {
            let itemMenu = new itemMenuModel(req.body);
            itemMenu.workerID = req.tokenData._id
            itemMenu.save();


            res.json(itemMenu)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    addItemMenu: async (req, res) => {

        let { itemId, restId } = req.params
        try {
            console.log(restId)

            let rest = await RestaurantModel.updateOne({ _id: restId }, { $push: { 'menu': itemId } })

            console.log(rest)

            res.json(rest)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    }
    ,
    removeItemMenu: async (req, res) => {

        let { itemId, restId } = req.params
        try {
            console.log(restId)

            let rest = await RestaurantModel.updateOne({ _id: restId }, { $pull: { 'menu': { $in: [itemId] } } })

            console.log(rest)

            res.json(rest)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    }
    ,
    deleteItemMenu: async (req, res) => {

        let { delItemId } = req.params
        try {
            console.log(delItemId)
            let itenDel = await itemMenuModel.deleteOne({ _id: delItemId })
            res.json(itenDel)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    }
    ,
    editItemMenu: async (req, res) => {
        let validBody = validateEditItemMenu(req.body);
        if (validBody.error) {
          return res.status(400).json({ msg: "Need to send body" });
        }
        let { editItemId } = req.params
        try {
            console.log(req.body)
            let itenEdit = await itemMenuModel.updateOne({ _id: editItemId },req.body)
            res.json(itenEdit)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    editCategoryItemMenu: async (req, res) => {
        
        if (!req.body.category.name) {
          return res.status(400).json({ msg: "Need to send category" });
        }
        let { editItemId } = req.params
        try {
            console.log(req.body)
            let itenEdit = await itemMenuModel.updateOne({ _id: editItemId },{$set:{'category.name':req.body.category.name}})
            res.json(itenEdit)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    editSubategoryItemMenu: async (req, res) => {
        
        if (!req.body.category.subcategory) {
          return res.status(400).json({ msg: "Need to send subcategory" });
        }
        let { editItemId } = req.params
        try {
            console.log(req.body)
            let itenEdit = await itemMenuModel.updateOne({ _id: editItemId },{$set:{'category.subcategory':req.body.category.subcategory}})
            res.json(itenEdit)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    }

}

