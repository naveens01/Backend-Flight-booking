import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect("mongodb://127.0.0.1/flight_booking")
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((err) => {
      console.log(" from DB.js ", err);
    });
};

export default connectDB;
