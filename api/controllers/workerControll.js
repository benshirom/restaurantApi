const { RestaurantModel } = require("../models/restaurantModel");
const { UserModel } = require("../models/userModel");



exports.WorkerCtrl={
    addworker: async (req, res) => {
        let validBody = validSignUpWorker(req.body)
    }
    
}