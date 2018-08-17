const express = require('express');
// const router = express.Router();
const flipkartController = require("./../controllers/controller");
const appConfig = require("./../config/appConfig")
const auth = require("./../middlewares/auth")

module.exports.setRouter = function(app){

	let baseUrl = appConfig.apiVersion+'/items';	

    app.get(baseUrl+'/all',auth.isAuthenticated, flipkartController.getAllItems);

    app.get(baseUrl + '/view/:productId', auth.isAuthenticated, flipkartController.viewByproductId);

    app.post(baseUrl + '/delete/:productId', auth.isAuthenticated, flipkartController.deleteItem);

    app.post(baseUrl + '/add', auth.isAuthenticated, flipkartController.addItem);

    app.put(baseUrl + '/edit/:productId', auth.isAuthenticated, flipkartController.editProduct);
}
