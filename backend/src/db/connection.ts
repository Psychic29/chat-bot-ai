import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL as string);
  } catch (e) {
    console.log(e);
    throw new Error("Could not connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (e) {
    console.log(e);
    throw new Error("Could not Disconnect to MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
