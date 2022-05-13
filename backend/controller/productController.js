const Product = require('../models/Product')
const productData = require('../data')

const productSeedController = async (req,res)=>{
    await Product.deleteMany({})
    const products = await Product.insertMany(productData)
    res.send(products)
    console.log("sedd")
}

const productController = async (req,res)=>{
    const products = await Product.find()
    res.send(products)
    console.log("products")
}

const singleproductController = async (req,res)=>{
    let singleproduct = {}
    const products = await Product.find()
    products.forEach((product)=> { 
      if(req.params.slug == product.slug){
        singleproduct = product
      }
    }) 
  res.send(singleproduct)
}

module.exports = {productSeedController,productController,singleproductController}
