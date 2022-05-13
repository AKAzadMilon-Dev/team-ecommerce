const mongoose = require('mongoose');

const connect = ()=>{
    mongoose.connect(process.env.DBCONNECT,()=>{
        console.log("mongodb connected")
    });
}

module.exports = connect