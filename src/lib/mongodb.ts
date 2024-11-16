import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;
const connection: { isConnected?: number} = {}

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

export async function connectToDatabase() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(MONGO_URI);

  connection.isConnected = db.connections[0].readyState;

}
