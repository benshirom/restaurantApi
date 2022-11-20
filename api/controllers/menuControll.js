const { RestaurantModel } = require("../models/restaurantModel");
const { UserModel } = require("../models/userModel");


exports.MenuCtrl={
    getMenu: async (req, res) => {
        let {restId}= req.params
        try{
         let restaurant = await RestaurantModel.findOne({_id:restId}).populate('menu');
         
         res.json(restaurant.menu)
        }catch(err){
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    }

}
