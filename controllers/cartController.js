
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
    } else {
        cart.findOne({ 'productId': req.params.productId })
            // .select('_id -__v')
            .exec((err, result) => {

                if (err) {
                    // console.log("Error Occured.");
                    logger.error(`Error Occured : ${err}`, "Cart cannot be saved", 10)
                    let apiResponse = response.generate(true, 'Cart cannot be saved', 403, null)
                    res.send(apiResponse)
                } else if (result) {
                    // console.log('Product already exist in cart.')

                    logger.info('Product already exist in cart', 'cartController: addToCart', 500)
                    let apiResponse = response.generate(false, 'product already in cart', 404, result)
                    res.send(apiResponse)
                } else if (check.isEmpty(result) || result == undefined || result == null || result == '') {
                    let newItem = new cart({
                        productId: req.params.productId
                    })
                    newItem.save((err, result) => {
                        if (err) {
                            // console.log('error occured.')
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

            })

    }
}


let getAllItems = (req, res) => {
    cart.find()
    .select('-_id -__v')
    .lean()
    .exec((err, result) => {
        if (err) {
            logger.error(err.message, 'cartController: getAllItems', 10)
            let apiResponse = response.generate(true, 'Error Occured', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Item found in database', 'cartController: getAllItems')
            let apiResponse = response.generate(true, 'No item found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info('items found', 'cartController: getAllItems', 200)
            let apiResponse = response.generate(false, 'All Item Details', 200, result)
            res.send(apiResponse)
        }
    })
}

let deleteItem = (req, res) => {
    if (check.isEmpty(req.params.productId)) {
        logger.error('productId is missing', 'cartController: deleteItem', 403)
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        cart.remove({ 'productId': req.params.productId }, (err, result) => {
            if (err) {
                logger.error(`Error Occured: ${err}`, 'cartController: deleteItem', 500)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Item Found', 'cartController: deleteItem', 5)
                let apiResponse = response.generate(true, 'item not found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Item Deleted Successfully', 'cartController: deleteItem', 200)
                let apiResponse = response.generate(false, 'Item Removed Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


module.exports = {
    addToCart: addToCart,
    getAllItems: getAllItems,
    deleteItem: deleteItem
}




