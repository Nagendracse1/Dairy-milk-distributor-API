const {diaryMilk, counter, milkSold} = require('../models/dmd')
const MILKCAPACITY  = require('../constants')

module.exports = async(req, res) =>{

    if(MILKCAPACITY < req.body.quantity || !req.body.quantity){
        return res.status(400).json({"Error": "Milk not available"});
    }
    const milkRequired = req.body.quantity
    let date = new Date()
    date = date.toString()
    date = date.substring(4,15)
    const milkSoldd = await milkSold.findOne({date: date})

    if(!milkSoldd || MILKCAPACITY >= (Number(milkSoldd.capacity) + milkRequired)){
        let  count = await counter.findOneAndUpdate({},{"$inc": {count:1}},{upsert: true})
        count = count ? count : {count:0}
        await diaryMilk.create({id: Number(count.count)+1, quantity: milkRequired, status:"placed", date: date})
        await milkSold.findOneAndUpdate({date: date},{$inc: {capacity:milkRequired}},{upsert: true})
    }
    else{
        return res.status(400).json({"Error": "Milk not available"});
    }
    return res.status(200).json({"message": "Order placed"});
}