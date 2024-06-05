const User = require('../models/user'); // Import the User model
const Event = require('../models/event'); // Import the User model
const bcryptjs = require('bcryptjs');
const dbConnection = require('../config/database'); 
const mongoose = require('mongoose');
const user = mongoose.model('User');

async function registerUser(firstname,lastname,email, password,role) {
 
  dbConnection
  console.log(firstname)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = new User({firstname,lastname, email, password: hashedPassword ,role});
  await user.save();
  return user;
}

async function loginUser(email, password) {
  dbConnection
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email');
  }
  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error('password');
  }
  return user;
}
async function fetchUser() {
  dbConnection; 
  const users = await User.find();
  return users;
}
async function deleteUser(userId){
  dbConnection;
  const result= await Event.deleteOne({ _id:userId });
  return result;
}
async function fetchUserbyID(userID) {
  dbConnection
  console.log(userID);

  const user = await User.findOne({_id:userID});
  return user;
}

async function findUserEvents(userId){
  console.log(userId);
    
  const user = await User.findById(userId);
  
  if (!user) {
    console.error('User not found');
    return []; // or throw an error
  }
  
  const events = await Event.find({ _id: { $in: user.events } });
  console.log(events);
  
  return events;
    }
  

module.exports = {
  registerUser,
  loginUser,
  fetchUser,
  deleteUser,
  fetchUserbyID,
  findUserEvents,
};
