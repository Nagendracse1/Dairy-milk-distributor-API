const {milkSold} = require('../models/dmd')
 
module.exports = async(req, res) =>{

    const date = decodeURIComponent(req.params.id)
    const milk =await milkSold.findOne({date:date})
    if(milk){
        return res.status(200).json({"Milk sold": milk.capacity});
    }
    return res.status(400).json({"Error": "Please enter a valid date"});
    
}