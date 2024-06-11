const User = require('../models/user'); // Import the User model
const Event = require('../models/event'); // Import the User model
const bcryptjs = require('bcryptjs');
const dbConnection = require('../config/database'); 
const mongoose = require('mongoose');
const user = mongoose.model('User');

async function registerUser(firstname,lastname,email, password,role,branch) {
 
  dbConnection
  console.log(branch)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = new User({firstname,lastname, email, password: hashedPassword ,role,branch});
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




async function forgotPassword(email) {
  dbConnection
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
  await user.save();

  const resetURL = `http://localhost:3000/pages/users/reset-password/${resetToken}`;
  const message = `Forgot your password? Click this <a href="${resetURL}">link</a> to reset it.`;

  await sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: message,
  });


}
async function fetchUser() {
  dbConnection; 
  const users = await User.find();
  return users;
}
async function deleteUser(userId){
  dbConnection;
  const result= await User.deleteOne({ _id:userId });
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
  forgotPassword
};
