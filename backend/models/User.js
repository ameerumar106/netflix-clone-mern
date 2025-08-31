const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie'
  }],
},
{ timestamps: true });

module.exports = mongoose.model('User', UserSchema);