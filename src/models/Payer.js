const mongoose = require('mongoose');
const PayerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Add Payer name']
    },
    username: {
        type: String, 
        required: [true, 'Add a username'],
        unique: [true, 'Username already exists']
    },
    userId: {
        type: String, 
    },
    age:{
        type: Number, 
        required: [true, 'Enter age between 18 to 60'],
        min: [18, 'Age should be greater than 18'],
        max: [60, 'Age should be less than 60']
    },
    panId: {
        type: String, 
        required: [true, 'Please enter a valid PAN number'],
        validate: {
            validator: function(v) {
              return /([A-Z]){5}([0-9]){4}([A-Z]){1}$/.test(v);
            },
            message: props => `${props.value} is not a valid PAN Card number!`
        },
    },
    state: {
        type: String
    }

})


const Payer = mongoose.model('Payer', PayerSchema);

module.exports = Payer;