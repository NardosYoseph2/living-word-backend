const Event = require('../models/event'); 
const mongoose = require('mongoose');
const User = mongoose.model('User');
const dbConnection = require('../config/database'); 

async function createEvent(eventData) {
  dbConnection; 
  const event = new Event(eventData);
  await event.save();
  return event;
}
async function fetchEvent() {
  dbConnection; 
  const events = await Event.find();
  return events;
}
async function fetchEventbyID(eventID) {
  dbConnection; 
  const event = await Event.findOne({_id:eventID});
  return event;
}
async function deleteEvent(eventId){
  dbConnection;
  const result= await Event.deleteOne({ _id:eventId });
  return result;
}
async function searchEvent(searchTerm) {
  dbConnection; 
  const query = {
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search on title
      { description: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search on description
      // ... add more search criteria based on your needs
    ]}
    const events = await Event.find(query);
  return events;
}

module.exports = {
  createEvent,
  fetchEvent,
  searchEvent,
  fetchEventbyID,
};
