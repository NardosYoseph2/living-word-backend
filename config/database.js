const mongoose = require('mongoose');

require ('dotenv').config();
// MongoDB connection URI
// const uri = 'mongodb+srv://nardos:nardi123@event.bb6br8p.mongodb.net/'; // Change 'myDatabase' to your database name
const uri = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));
 // client.close();
module.exports = mongoose.connection;
