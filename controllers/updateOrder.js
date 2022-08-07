const {diaryMilk, counter, milkSold} = require('../models/dmd')
const MILKCAPACITY  = require('../constants')

module.exports = async(req, res) =>{

    if(MILKCAPACITY < req.body.quantity || !req.body.quantity){
        return res.status(400).json({"Error": "Milk not available"});
    }
    const milkRequired = req.body.quantity
    const id = req.params.id
    const milk = await diaryMilk.findOne({id: id})
    const milkSoldd = await milkSold.findOne({date: milk.date})

    if(milkSoldd || MILKCAPACITY >= (Number(milkSoldd.capacity) + milkRequired - milk.quantity)){
        await diaryMilk.findOneAndUpdate({id:id},{quantity: milkRequired, status:"placed", date: milk.date})
        await milkSold.findOneAndUpdate({date: milk.date},{$set: {capacity:(milkSoldd.capacity - milk.quantity + milkRequired)}})
    }
    else{
        return res.status(400).json({"Error": "Invalid"});
    }
    return res.status(204).json({"message": "updated"});
}