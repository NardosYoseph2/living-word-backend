const userService = require('../services/user_service');
const mongoose = require('mongoose');
const token= require('../config/generate_token');
const dbConnection = require('../config/database')

async function register(req, res) {
 
    try {
        const { username, email, password,role } = req.body;
        const newUser = await userService.registerUser(username, email, password,role);
        res.json({ message: 'User registered successfully!', data: newUser });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
        console.log(req.body);
        console.log(req);
        console.log('failed to register');
    }
}; 
async function login(req, res) {
    
  
    try {
        const { email, password } = req.body;
        const loggedInUser = await userService.loginUser(email, password);
        const generatedToken = token.generateToken(loggedInUser);
        console.log('Login successful');

        res.json({ message: 'Login successful!', token: generatedToken });
    } catch (err) {
        res.status(err.status || 401).json({ message: err.message });
    }
 }

 async function refreshToken(req, res) {
    
    try {
    const userId = req.user.id; 
    const newAccessToken = token.generateToken(userId); 
    console.log('refresh token successful');
    res.json({ accessToken: newAccessToken });
} catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: err.message });
  }

}

async function fetchUser(req, res) {
    try {
        const userList = await userService.fetchUser();
        const formattedUserList = await Promise.all(userList.map(async user => {
          return {
            _id: user._doc._id,
            username:user._doc.username,
            profilePicture: user._doc.profilePicture,
            email: user._doc.email,
            password: user._doc.password,
            role: user._doc.role,
            events: user._doc.events,
          }; 
        }));
      console.log('Users fetched successfully');
        
        res.status(200).json({ message: 'Users fetched successfully',userList: formattedUserList });
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function fetchEventOrganizers(req, res) {
    try {
        const EventOrganizersList = await userService.fetchEventOrganizers();
        const formattedUserList = await Promise.all(EventOrganizersList.map(async user => {
          return {
            _id: user._doc._id,
            username:user._doc.username,
            profilePicture: user._doc.profilePicture,
            email: user._doc.email,
            password: user._doc.password,
            role: user._doc.role,
            events: user._doc.events,
          }; 
        }));
      console.log('EventOrganizers fetched successfully');
        
        res.status(200).json({ message: 'EventOrganizers fetched successfully',EventOrganizersList: formattedUserList });
    } catch (err) {
      console.error('Error fetching EventOrganizers:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

async function fetchUserbyID(req, res) {
    try {
        const singleUser = await userService.fetchUserbyID(req.body.id);
    console.log('user fetched successfully');
        res.status(200).json({ message: 'user fetched successfully',user: singleUser });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function findUserEvents(req, res) {
    try {
        const userId = req.params.userId;
        const events = await userService.findUserEvents(userId);
    console.log('events fetched successfully');
        res.status(200).json({ message: 'events fetched successfully',events: events });
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    register,
    login,
    refreshToken,
    fetchUser,
    fetchUserbyID,
    findUserEvents,
    fetchEventOrganizers
};
