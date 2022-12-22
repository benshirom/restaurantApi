const { TableModel } = require("../models/tableModel");
const { RestaurantModel } = require("../models/restaurantModel");
const { validateAddTable,validateEditTable ,validateEditTableLocation } = require("../validation/tableValidation");

exports.TableCtrl={
   
    createNewTable: async (req, res) => {
        let validBody = validateAddTable(req.body);

        if (validBody.error) return res.status(400).json(validBody.error.details);
        let {restId } = req.params
        try {
            let Table= new TableModel(req.body);
            
            Table.save();
            let rest = await RestaurantModel.updateOne({ _id: restId }, { $push: { 'tables': Table._id } })
            console.log(rest)

            res.json(Table._id)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    removeTableFromRestaurant: async (req, res) => {
        let { tableId, restId } = req.params
        try {
            console.log(restId)

            let rest = await RestaurantModel.updateOne({ _id: restId },
                 { $pull: { 'tables': { $in: [tableId] } } })
            let delTable = await TableModel.deleteOne({ _id: tableId })

            console.log(rest.tables)

            res.json(rest)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    
    editTable: async (req, res) => {

        let validBody = validateEditTable(req.body);

        if (validBody.error) return res.status(400).json(validBody.error.details);
        let { editTableId } = req.params
        try {
            console.log(req.body)
            let EditTable = await TableModel.updateOne({ _id: editTableId },req.body)
            res.json(EditTable)
        }catch(err){
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    editOrderID: async (req, res) => {
        if (!req.body.isCatched) {
            return res.status(400).json({ msg: "Need to send isCatched" });
          }
          let { editTableId,orderID } = req.params
          try {
              console.log(req.body)
              let EditTable = await TableModel.updateOne({ _id: editTableId },[{$set:{'isCatched':req.body.isCatched,'orderID':orderID}}])
              res.json(EditTable)
          } catch (err) {
              console.log(err);
              res.status(500).json({ msg: "there error try again later", err })
          }
    },
    editLocation: async (req, res) => {
        let validBody = validateEditTableLocation(req.body);

        if (validBody.error) return res.status(400).json(validBody.error.details);
          let { editTableId } = req.params
          try {
              console.log(req.body)
              let EditTable = await TableModel.updateOne({ _id: editTableId },{$set:{'location':req.body.location}})
              res.json(EditTable)
          } catch (err) {
              console.log(err);
              res.status(500).json({ msg: "there error try again later", err })
          }
    },
    // editTableOwenr: async (req, res) => {
   
    //       let { editTableId,orderId } = req.params
    //       try {
    //           console.log(req.body)
    //           let EditTable = await TableModel.updateOne({ _id: editTableId },{$set:{'tableOwenr':orderId}})
    //           res.json(EditTable)
    //       } catch (err) {
    //           console.log(err);
    //           res.status(500).json({ msg: "there error try again later", err })
    //       }
    // },
    


}
