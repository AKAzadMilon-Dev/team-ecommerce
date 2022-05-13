const express = require('express')
const router = express.Router()

const {productSeedController,productController,singleproductController} = require('../controller/productController')

router.get('/seed/product',productSeedController)
router.get('/product',productController)
router.get('/product/:slug',singleproductController)

module.exports = router