const mongoose = require('mongoose');

const recentEventSchema = new mongoose.Schema({
    title: {type: String ,unique:false, required: true},
    description: {type: String ,unique:false, required: false},
    image: {type: String ,unique:false, required: true},
    video: {type: String ,unique:false, required: true},
  });
  const RecentEvent = mongoose.model('RecentEvent', recentEventSchema);
  module.exports=RecentEvent

  