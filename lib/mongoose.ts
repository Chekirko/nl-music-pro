import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "NL-Worship",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
