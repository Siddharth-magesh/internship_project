const express = require('express');
const router = express.Router();
const mongoDB = require('../db/mongo'); // Import MongoDB connection

// GET user profile by userId
router.get('/profile/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  try {
    const db = await mongoDB;
    const profileCollection = db.collection('profiles');

    const profile = await profileCollection.findOne({ userId });

    if (!profile) {
      return res.json({ age: '', dob: '', contact: '' }); // Return blank if not found
    }

    const { age, dob, contact } = profile;
    return res.json({ age, dob, contact });
  } catch (error) {
    console.error('❌ Get Profile Error:', error);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// POST update or create user profile
router.post('/profile/update', async (req, res) => {
  let { userId, age, dob, contact } = req.body;

  userId = parseInt(userId);

  if (isNaN(userId) || isNaN(parseInt(age)) || !dob || !contact) {
    return res.status(400).json({ error: 'Invalid or missing profile data' });
  }

  try {
    const db = await mongoDB;
    const profileCollection = db.collection('profiles');

    await profileCollection.updateOne(
      { userId },
      {
        $set: {
          age: parseInt(age),
          dob: dob.trim(),
          contact: contact.trim()
        }
      },
      { upsert: true }
    );

    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('❌ Update Profile Error:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
