
const mongoose = require('mongoose')
const shortId = require('shortid')

const time = require('./../lib/timeLib')

const response = require('./../lib/responseLib')
const logger = require('./../lib/loggerLib')
const check = require('./../lib/checkLib')

const Product = mongoose.model('ProductSchema')
const cart = mongoose.model('cartSchema')


let addToCart = (req, res) => {
    if (check.isEmpty(req.params.productId)) {
            console.log('productId is missing')
            logger.error('productId is missing', 'cartController: addToCart', 403)
            let apiResponse = response.generate(true, 'productId is missing', 403, null)
            res.send(apiResponse)
    }  else {        
            cart.findOne({'productId': req.params.productId }, (err, result) => {
                    if (err) {
                        console.log("Error Occured.");
                        logger.captureError(`Error Occured : ${err}`, "Cart cannot be saved", 10)
                        let apiResponse =  response.generate(true, 'Cart cannot be saved', 403, null)
                        res.send(apiResponse)
                    } else if (result) {
                        console.log('Product already exist in cart.')
                        logger.info('Pr')
                    }
            
    }
    
  )}
}




module.exports = {
    addToCart: addToCart
}




else if (check.isEmpty(result) || result == undefined || result == null || result == '') {
    let newItem = new cart({
        productId: req.params.productId
    })
    newItem.save((err, result) => {
        if (err) {
            console.log('error occured.')
            logger.error('Error Occured', 'cartController: addToCart', 10)
            let apiResponse = response.generate(true, 'error occured', 403, null)
            res.send(apiResponse)
        } else {
            logger.info('item added to cart', 'cartController: addToCart', 20)
            let apiResponse = response.generate(false, 'Items added to cart', 200, result)
            res.send(apiResponse)
        }
    })
} 