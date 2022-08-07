const express = require('express')
const { default: mongoose } = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')



try {
    mongoose.connect('mongodb://localhost/dmd')
} catch (error) {
 console.log(error)   
}
const app = new express()

app.use(bodyParser.json())

const addOrder = require('./controllers/addOrder')
const updateOrder = require('./controllers/updateOrder')
const udpateOrderStatus = require('./controllers/udpateOrderStatus')
const deleteOrder = require('./controllers/deleteOrder')
const checkCapacity = require('./controllers/checkCapacity')

app.post('/',addOrder)
app.put('/update/:id',updateOrder)
app.put('/updateStatus/:id',udpateOrderStatus)
app.delete('/delete/:id',deleteOrder)
app.get('/checkCapacity/:id',checkCapacity)


app.listen(process.env.PORT || 1007, '0.0.0.0')



