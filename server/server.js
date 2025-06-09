// backend/app.js
const express = require('express');
const cors = require('cors');
const mysqlPool = require('./db/mysql');
const mongoDB = require('./db/mongo');  // db object directly

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', profileRoutes);

app.listen(PORT, async () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);

  // MySQL test
  try {
    await mysqlPool.execute('SELECT 1');
    console.log('🟢 MySQL connected successfully');
  } catch (err) {
    console.error('🔴 MySQL connection failed:', err.message);
  }

  // MongoDB test
  try {
    const db = await mongoDB;
    console.log('🟢 MongoDB connected successfully to DB:', db.databaseName);
  } catch (err) {
    console.error('🔴 MongoDB connection error:', err.message);
  }
});
