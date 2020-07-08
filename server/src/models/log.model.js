const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: String,
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  date: {
    required: true,
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Log', LogSchema);
