const mongoose = require('mongoose');
const AccountantSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Add accountant name']
    },
    username: {
        type: String, 
        required: [true, 'Add a username'],
        unique: [true, 'Username already exists']
    },
    userId: {
        type: String
    },
    payerIds : {
        type: Array
    }
})


const Accountant = mongoose.model('Accountant', AccountantSchema);

module.exports = Accountant;