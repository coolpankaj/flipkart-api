const mongoose = require('mongoose')

const Schema = mongoose.Schema

let cartSchema = new Schema({


    productId: {
        type: String,
        default: ''
    }
})

mongoose.model('cartSchema', cartSchema);