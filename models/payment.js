// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount:{type: String , required: true},
    currency:{type: String , required: false},
    tx_ref: { type: String, unique: true, required: true }, 
    status: { type: String, required: false }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    eventId: {type:mongoose.Schema.Types.ObjectId, ref: 'Event'}

});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
