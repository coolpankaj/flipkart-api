const express = require('express')
const mongoose = require('mongoose')
const time = require('./../lib/timeLib')
const today = time.getLocalTime()

const Schema = mongoose.Schema()

let ProductSchema = new Schema({
    productId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    freeDelivery: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    sizes: {
        type: [],
        default: []
    },
    tags: {
        type: [],
        default: []
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    productAdded: {
        type: Date,
        default: today
    },
    lastModified: {
        type: Date,
        default: today
    }
})

mongoose.model('ProductSchema', ProductSchema);
