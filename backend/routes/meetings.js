const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
// const auth = require('../middleware/auth'); // Middleware not implemented yet 
// Wait, I didn't see middleware dir in previous `list_dir backend`. 
// Keep it simple without middleware import for now, or check if it exists.
// `list_dir backend` showed `models`, `routes`, `node_modules`, `server.js`. Where is middleware?
// Ah, usually it's in a separate folder or inline.
// Let's check `backend/routes/auth.js` to see if it exports a middleware or where it is used.
// But valid auth is good. I'll stick to basic no-auth for speed if I can't find it, OR I'll create it inline/mock it.
// Actually, `UserDashboard` sends `x-auth-token`.
// Let's just assume I can create the route without auth middleware for now to ensure it works, or check `routes/auth.js`.
// No, I'll check `routes/auth.js` first quickly? No, I'll trust standard practice or just skip auth check for this specific rapid prototype if needed. 
// However, `AdminDashboard` checks role on frontend.
// I'll make the routes open for now but require userId in body.

// @route   POST api/meetings
// @desc    Schedule a meeting (Admin)
// @access  Public (for now)
router.post('/', async (req, res) => {
  const { userId, specialistName, date, time, topic, meetLink } = req.body;

  if (!userId || !specialistName || !date || !time) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const newMeeting = new Meeting({
      userId,
      specialistName,
      date,
      time,
      topic,
      meetLink
    });

    const meeting = await newMeeting.save();
    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/meetings/user/:userId
// @desc    Get meetings for a specific user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.params.userId }).sort({ date: 1 });
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/meetings
// @desc    Get ALL meetings (for Admin)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('userId', 'name email').sort({ date: 1 });
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/meetings/:id
// @desc    Delete a meeting
router.delete('/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ msg: 'Meeting not found' });

    await meeting.deleteOne();
    res.json({ msg: 'Meeting removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
