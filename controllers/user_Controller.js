const userService = require('../services/user_service');
const mongoose = require('mongoose');
const token= require('../config/generate_token');
const dbConnection = require('../config/database')

async function register(req, res) {
 
    try {
        const {firstname,lastname, email, password,role ,branch} = req.body;
        console.log(req.body);

        const newUser = await userService.registerUser(firstname,lastname, email, password,role,branch);
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
 async function forgotPassword(req, res) {
    
  
  try {
      const { email} = req.body;
      const loggedInUser = await userService.forgotPassword(email);
      console.log('email sent successful');

      res.json({ message: 'email sent successful!'});
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
            firstname: user._doc.firstname,
            lastname: user._doc.lastname,
            email: user._doc.email,
            password: user._doc.password,
            role: user._doc.role,
            branch: user._doc.branch
          }; 
        }));
      console.log('Users fetched successfully');
        
        res.status(200).json({ message: 'Users fetched successfully',userList: formattedUserList });
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async function deleteUser(req, res) {
    try {
        const event = await userService.deleteUser(req.body.userId);
      console.log('USer deleted successfully');
  
        res.status(200).json({ message: 'User deleted successfully',event: event });
    } catch (err) {
      console.error('Error deleting user:', err);
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
    deleteUser,
    findUserEvents,
    forgotPassword
};
