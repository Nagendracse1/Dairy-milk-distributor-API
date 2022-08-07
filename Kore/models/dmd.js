const {Int32} = require('bson')
const mongoose = require('mongoose')

const diaryMilkSchema = new mongoose.Schema({

    id: {
        unique: false,
        type: Number,
        require:true
    },
    quantity: {
        type: Number,
        require: true
    },
    status:{
        type: String,
        require: true
    },
    date: String
})

const counterSchema = new mongoose.Schema({
    count:{
        type: Number
    }
})

const milksoldSchema = new mongoose.Schema({
    capacity:{
        type: Number
    },
    date: {
        type: String,
        unique: true
    }
})


module.exports = {
    diaryMilk: mongoose.model('diaryMilk', diaryMilkSchema),
    counter: mongoose.model('counter', counterSchema),
    milkSold: mongoose.model('milkSold', milksoldSchema)
}