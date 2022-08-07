const {diaryMilk, counter, milkSold} = require('../models/dmd')

module.exports = async(req, res) =>{

    const id = req.params.id
    const status = req.body.status
    const milk = await diaryMilk.findOneAndUpdate({id:id},{"$set": {status: status}})

    if(!milk){
        return res.status(400).json({"Error": "Invalid id"});
    }

    return res.status(204).json({"message": "Updated"});
}