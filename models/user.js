// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname:{type: String ,unique:false, required: true},
  lastname:{type: String ,unique:false, required: true},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
 branch: {type: String,required:false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
