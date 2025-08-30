const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  imgTitle: {
    type: String,
  },
  imgThumb: {
    type: String,
  },
  trailer: {
    type: String,
  },
  video: {
    type: String,
  },
  year: {
    type: String,
  },
  limit: {
    type: Number,
  },
  genre: {
    type: String,
  },
  isSeries: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    default: "",
  },
  cast: {
    type: [String],
    default: [],
  },
},
{ timestamps: true });

module.exports = mongoose.model('Movie', MovieSchema);