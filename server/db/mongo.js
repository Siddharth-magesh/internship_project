// backend/db/mongo.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const dbName = 'authsystem';

async function connectToMongo() {
  try {
    await client.connect();
    console.log('MongoDB connected inside mongo.js');
    return client.db(dbName);
  } catch (err) {
    console.error('MongoDB connection error in mongo.js:', err.message);
    throw err;
  }
}

module.exports = connectToMongo();
