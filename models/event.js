const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {type: String ,unique:false, required: true},
    description: {type: String ,unique:false, required: false},
    category:{type: String,unique:false,required:true},
    date: {type: Date ,unique:false, required: true},
    time:{type: String ,unique:false, required: true},
    address:{type: String ,unique:false, required: true},
    image: {type: String ,unique:false, required: true},
  });
  const Event = mongoose.model('Event', eventSchema);
  module.exports=Event
