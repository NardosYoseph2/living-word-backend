const dbConnection = require('../config/database'); 
const Payment = require('../models/payment');

async function storePayment(paymentData) {
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
  }
  async function updatePayment(tx_ref){
  const updatedPayment = await Payment.findOneAndUpdate(
        { tx_ref },
        { status: 'success' } 
      );
      if (!updatedPayment) {
        throw new Error('Payment not found');
      }
      return updatePayment;
  }


module.exports={
    storePayment,
    updatePayment}