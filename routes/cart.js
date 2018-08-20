const cartController =  require('./..//controllers/cartController')
const auth = require('./../middlewares/auth')
const appConfig = require('./../config/appConfig')



module.exports.setRouter = function(app){

    let baseUrl = appConfig.apiVersion+'/cart';
    
    app.post(baseUrl + '/add/:productId', auth.isAuthenticated, cartController.addToCart)

    app.get(baseUrl + '/all', auth.isAuthenticated, cartController.getAllItems)

    app.post(baseUrl + '/delete/:productId', auth.isAuthenticated, cartController.deleteItem)

   

   
}
