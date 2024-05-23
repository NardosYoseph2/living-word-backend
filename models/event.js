const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {type: String ,unique:false, required: true},
    description: {type: String ,unique:false, required: false},
    date: {type: Date ,unique:false, required: true},
    time:{type: String ,unique:false, required: true},
    adress:{type: String ,unique:false, required: true},
    // rate: {type: Number ,unique:false, required: true},
    //price: {type: Number ,unique:false, required: false},
    //availableTickets: {type: Number ,unique:false, required: true},
    image: {type: String ,unique:false, required: true},
   // status: {type: String ,unique:false, required: false},
  });
  const Event = mongoose.model('Event', eventSchema);
  module.exports=Event