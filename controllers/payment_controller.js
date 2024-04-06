const eventController = require('../controllers/event_controllers');
const paymentService = require('../services/payment_service');
const axios = require("axios");
const express = require('express');
const router = express.Router();

async function paymentStatus(req, res) {
  console.log('Received callback:', req.body);
  console.log('Received callback:', req.params);

  const tx_ref = req.params.tnxRef;
  const eventId=req.params.eventId;
  const userId=req.params.userId;

  try{
  const verificationResponse = await verifyPayment(tx_ref);

  if (verificationResponse == 200) {
    console.log("chapa response success");

    const updatedPayment = await updatePayment(tx_ref);
      const eventPurchased = await eventController.buyTicket(eventId, userId);
      res.status(200).json({ message: 'Ticket purchased successfully!', event: eventPurchased });
  } else {
    console.error('Payment verification failed:',verificationResponse);
    res.status(400).json({ message: 'Payment verification failed' }); 
  }  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
}


async function verifyPayment(tx_ref) {
  console.error('passed',tx_ref);

  try {
    const url = `https://api.chapa.co/v1/transaction/verify/${tx_ref}`;
    const response = await axios.get(url,{headers: {
      Authorization:`Bearer CHASECK_TEST-UypQuM3qv8ILnTdCRpdqjrzmnQxIksKx`,'Content-Type': 'application/json'
    }},);
    const payment_status=response['status'];
    console.log("verification:", payment_status)
    return payment_status;
  } catch(error) {
    console.log("error verification:", error)

  }
}
async function storePayment(req, res) {
  console.log(req.body)
  try {
    const paymentData = await paymentService.storePayment(req.body);
    console.log('payment stored')
    res.status(200).json({ message: 'payment stored successfuly', payment: paymentData });
  } catch(error) {
    console.log('error storing payment',error)
    res.status(500).json({ message: "error storing payment" });

  }
}

async function updatePayment(tx_ref) {
  console.error('update ft',tx_ref);
  try {
    const updatedPayment = await paymentService.updatePayment(tx_ref);
    return updatedPayment;
  } catch(error) {
    console.log("error updating payment:", error)

  }
}


module.exports = {
  paymentStatus,
  storePayment,
  verifyPayment
};
