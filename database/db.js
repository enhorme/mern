import mongoose from "mongoose";

function connectDb() {
  return mongoose
    .connect(process.env.NODE_MONGO)
    .then(() => {
      console.info("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
    });
}

export default connectDb;
