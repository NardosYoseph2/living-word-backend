const Event = require('../models/event'); 
const RecentEvent = require('../models/recent_event'); 
const mongoose = require('mongoose');
const User = mongoose.model('User');
const dbConnection = require('../config/database'); 

async function createEvent(eventData) {
  dbConnection; 
  const event = new Event(eventData);
  await event.save();
  return event;
}

async function addRecentEvent(eventData) {
  dbConnection; 
  const event = new RecentEvent(eventData);
  await event.save();
  return event;
}
async function fetchEvent() {
  dbConnection; 
  const events = await Event.find();
  return events;
}
async function fetchRecentEvent() {
  dbConnection; 
  const events = await RecentEvent.find();
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
async function deleteRecentEvent(eventId){
  dbConnection;
  const result= await RecentEvent.deleteOne({ _id:eventId });
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
  deleteEvent,
  addRecentEvent,
  searchEvent,
  fetchEventbyID,
  fetchRecentEvent,
  deleteRecentEvent
};
