const mongoose = require('mongoose');
const NewTaxSchema = new mongoose.Schema({
    basicPay: {
        type: Number,
        required: [true, 'enter basic pay']
    },
    hra: {
        type: Number
    },
    lta: {
        type: Number
    },
    stdDedcuction: {
        type: Number
    },
    investment: {
        type: Number
    },
    interest: {
        type: Number
    },
    insurance: {
        type: Number
    },
    nps: {
        type: Number
    },
    otherIncome: {
        type: Number
    },
    panId: {
        type: String
     }//,
    // accountantId: {
    //     type: String
    // }
})


module.exports = NewTaxSchema;
