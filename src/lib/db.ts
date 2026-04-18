import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URI;

if (!mongodbUrl) {
  throw new Error("Missing mongoDB url");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodbUrl)
      .then((conn) => conn.connection);
  }
  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log("MongoDB connection Error : ", error);
  }
};

export default connectToDB;