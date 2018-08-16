
const mongoose = require('mongoose')
const shortId = require('shortid')

const time = require('./../lib/timeLib')
const shortid = require('shortid');
const response = require('./../lib/responseLib')
const logger = require('./../lib/loggerLib')
const check = require('./../lib/checkLib')

const Product = mongoose.model('ProductSchema')

let getAllItems = (req, res) => {
    Product.find()
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.error(err.message, 'flipkartController: getAllItems', 10)
                let apiResponse = response.generate(true, 'Failed to find item details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Item found in database', 'flipkartController: getAllItems')
                let apiResponse = response.generate(true, 'No item found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('items found', 'flipkartController: getAllItems', 200)
                let apiResponse = response.generate(false, 'All Item Details', 200, result)
                res.send(apiResponse)
            }
        })

}

let viewByproductId = (req, res) => {
    if (check.isEmpty(req.params.productId)) {
        logger.error('productId is missing', 'flipakaertController: viewByproductId', 10)
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        Product.findOne({ 'productId': req.params.productId }, (err, result) => {
            if (err) {
                logger.error(`Error Occured: ${err}`, 'viewByproductId: viewByproductId', 10)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Item Found', 'flipkartController: viewByproductId', 5)
                let apiResponse = response.generate(true, 'item not found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Item Found Successfully', 'flipkartController: viewByproductId', 200)
                let apiResponse = response.generate(false, 'Item Found Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

let deleteItem = (req, res) => {
    if (check.isEmpty(req.params.productId)) {
        logger.error('productId is missing', 'flipkartController: deleteItem', 403)
        let apiResponse = response.generate(true, 'productId is missing', 403, null)
        res.send(apiResponse)
    } else {
        Product.remove({ 'productId': req.params.productId }, (err, result) => {
            if (err) {
                logger.error(`Error Occured: ${err}`, 'flipakartController: deleteItem', 500)
                let apiResponse = response.generate(true, 'Error Occured', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Item Found', 'flipkartController: deleteItem', 5)
                let apiResponse = response.generate(true, 'item not found', 404, null)
                res.send(apiResponse)
            } else {
                logger.info('Item Deleted Successfully', 'flipkartController: deleteItem', 200)
                let apiResponse = response.generate(false, 'Item Removed Successfully', 200, result)
                res.send(apiResponse)
            }
        })
    }
}

let addItem = (req, res) => {
    let addItemFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if (check.isEmpty(req.body.name) || check.isEmpty(req.body.description) || check.isEmpty(req.body.price) || check.isEmpty(req.body.category) || check.isEmpty(req.body.image) || check.isEmpty(req.body.sizes) || check.isEmpty(req.body.tags)) {
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                res.send(apiResponse)
            } else {
                var today = time.convertToLocalTime()
                let productId = shortid.generate()

                let newItem = new Product({
                    productId: productId,
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    category: req.body.category,
                    image: req.body.image,
                    freeDelivery: false,
                    productAdded: today,
                    lastModified: today
                })
                let sizes = (req.body.sizes != undefined && req.body.sizes != null && req.body.sizes != '') ? req.body.sizes.split() : []
                newItem.sizes = sizes;
                let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
                newItem.tags = tags

                newItem.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                        reject(apiResponse)
                    } else {
                        console.log('\n Product Added')
                        resolve(result)
                    }
                })
            }
        })
        

    }
    addItemFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Added Item successfully', 200, result)
            res.send(apiResponse)
        })
        .catch((error) => {
            console.log(error)
            res.send(error)
        })
}


module.exports = {
    getAllItems: getAllItems,
    viewByproductId: viewByproductId,
    deleteItem: deleteItem,
    addItem: addItem
}