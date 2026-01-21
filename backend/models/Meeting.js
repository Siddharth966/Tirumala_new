const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialistName: {
    type: String,
    required: true
  },
  date: {
    type: String, // Storing as string for simplicity (YYYY-MM-DD), or Date
    required: true
  },
  time: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  meetLink: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'scheduled' // scheduled, completed, cancelled
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Meeting', MeetingSchema);
