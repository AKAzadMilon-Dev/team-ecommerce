const express = require('express')
const app = express()
require('dotenv').config()
var bodyParser = require('body-parser')
const dbConnect = require('./config/dbConnection')
dbConnect()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const data = require('./data')
const authApi = require('./apis/authApi')
const ProductApi = require('./apis/productApi')


app.get('/cartproducts/:id', function (req, res) {
  let product = data.find((item)=>{
    if(req.params.id == item._id){
      return item
    }
  })
  res.send(product)
})

app.use('/api/auth',authApi)
app.use('/api',ProductApi)



const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log('running from backend')
})