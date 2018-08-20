const cartController =  require('./..//controllers/cartController')
const auth = require('./../middlewares/auth')
const appConfig = require('./../config/appConfig')



module.exports.setRouter = function(app){

    let baseUrl = appConfig.apiVersion+'/cart';
    
    app.post(baseUrl + '/add/:productId', auth.isAuthenticated, cartController.addToCart)
    /**
     * @api {post} /api/v1/cart/add/:productId add item (cart)
     * @apiVersion 0.0.1
     * @apiGroup create
     * 
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} productId productId of the product passed as a body parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
    "error": false,
    "message": "Items added to cart",
    "status": 200,
    "data": {
        "productId": "String",
        "_id": "String",
    }
}
@apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
     */

    app.get(baseUrl + '/all', auth.isAuthenticated, cartController.getAllItems)
    /**
     * @api {get} /api/v1/cart/all Get all items (cart)
     * @apiVersion 0.0.1
     * @apiGroup read
     * 
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
    "error": false,
    "message": "All Item Details",
    "status": 200,
    "data": [
        {
            "productId": "String"
        },
        {
            "productId": "String"
        }
    ]
}
@apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
     */

    app.post(baseUrl + '/delete/:productId', auth.isAuthenticated, cartController.deleteItem)
      /**
     * @api {post} /api/v1/cart/delete/:productId Delete product (cart)
     * @apiVersion 0.0.1
     * @apiGroup delete
     * 
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} productId productId of the product passed as the URL parameter
     * 
     * @apiSuccessExample {json} Success-Response:
     * {
    "error": false,
    "message": "Item removed successfully",
    "status": 200,
    "data": []
}
@apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
     */

   

   
}
