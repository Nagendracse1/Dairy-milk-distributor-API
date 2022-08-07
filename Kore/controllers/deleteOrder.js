const {diaryMilk, counter, milkSold} = require('../models/dmd') 

module.exports = async(req, res) =>{

    const id = decodeURIComponent(req.params.id)
    try {
        const deleted =await  diaryMilk.findOneAndDelete({id:id}) 
        if(!deleted){
            return res.status(400).json({"Error": "Invalid id"});
        }
        await milkSold.findOneAndUpdate({date: deleted.date},{$inc: {capacity:-Number(deleted.quantity)}})
        return res.status(202).json({});
    } catch (error) {
        console.log(error)
        return res.status(400).json({"Error": "Invalid"});
    }
}