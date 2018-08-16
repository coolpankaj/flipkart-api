const express = require('express')
const appConfig = require('./../config/appConfig')

let setRouter = (app) => {
    let baseUrl = appConfig.apiVersion + '/items';
    
    app.get(baseUrl + '/all', controller.getAllItems);

}