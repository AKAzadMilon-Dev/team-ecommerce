const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    rating:{
        type:String,
        required:true
    },
    model:{
        type:String,
        default:""
    },
    img:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    numberofratings:{
        type:Number,
        default:""
    },
    instock:{
        type:Number,
        default:""
    },
    cupon:{
        type:Number,
        default:""
    }
},{
    timestamps:true
});

module.exports = mongoose.model("products",Product)