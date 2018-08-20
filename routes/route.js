const express = require('express');
const flipkartController = require("./../controllers/controller");
const appConfig = require("./../config/appConfig")
const auth = require("./../middlewares/auth")

module.exports.setRouter = function(app){

	let baseUrl = appConfig.apiVersion+'/items';	

    app.get(baseUrl+'/all',auth.isAuthenticated, flipkartController.getAllItems);

    /**
     * @api {get} /api/v1/items/all Get all items
     * @apiversion 0.0.1
     * @apiGroup read
     * 
     * @apiparam {String} authToken The token for authentication. (Send authToken as query parameter, body parameter or as a header)
     * 
     * @apiSuccessExample {json} Success-Resaponse:
     * {
    "error": false,
    "message": "All Item Details",
    "status": 200,
    "data": [
        {
            "_id": "String",
            "name": "String",
            "description": "String",
            "price": Number,
            "category": "String",
            "image": "String",
            "freeDelivery": false,
            "views": Number,
            "sizes": object(type = array),
            "tags": object(type = array),
            "isAvailable": true,
            "productAdded": "Date",
            "lastModified": "Date",
            "productId": "String",
        }
    ]
}
        @apiErrorExample {json} Error-Response:
        *
        * {
	    "error": true,
	    "message": "Failed To Find Item Details",
	    "status": 500,
	    "data": null
	   }
     */

    app.get(baseUrl + '/view/:productId', auth.isAuthenticated, flipkartController.viewByproductId);

    /**
	 * @api {get} /api/v1/items/view/:productId Get a single product
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The blogId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "String",
    "status": 200,
    "data": {
        "name": "String",
        "description": "String",
        "price": Number,
        "category": "String",
        "image": "String",
        "freeDelivery": false,
        "views": Number,
        "sizes":cobject(type = array),
        "tags": object(type = array),
        "isAvailable": true,
        "productAdded": "Date",
        "lastModified": "Date",
        "_id": "String",
        "productId": "String",
    }
}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

    app.post(baseUrl + '/delete/:productId', auth.isAuthenticated, flipkartController.deleteItem);
    /**
	 * @api {post} /api/v1/items/delete/:productId Delete product
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Item removed Successfully",
	    "status": 200,
	    "data": []
	    	}
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


    app.post(baseUrl + '/add', auth.isAuthenticated, flipkartController.addItem);
      /**
	 * @api {post} /api/v1/items/add Add Item
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} name name of the product passed as a body parameter
	 * @apiParam {String} description description of the product passed as a body parameter
	 * @apiParam {Number} price price of the product passed as a body parameter
	 * @apiParam {String} category category of the blog passed as a body parameter
     * @apiParam {String} image image of the blog passed as a body parameter
     * @apiParam {String} sizes sizes of the blog passed as a body parameter
     * @apiParam {String} tags tags of the blog passed as a body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
    "error": false,
    "message": "String",
    "status": Number,
    "data": {
        "name": "String",
        "description": "String",
        "price": Number,
        "category": "String",
        "image": "String",
        "freeDelivery": false,
        "views": Number,
        "sizes": object(type = array),
        "tags": onject (type = array),
        "isAvailable": true,
        "productAdded": "Date",
        "lastModified": "Date",
        "_id": "String",
        "productId": "String",
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


    app.put(baseUrl + '/edit/:productId', auth.isAuthenticated, flipkartController.editProduct);

   
    /**
	 * @api {put} /api/v1/items/edit/:productId Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product Edited Successfully.",
	    "status": 200,
	    "data": []
	    	}
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
}
