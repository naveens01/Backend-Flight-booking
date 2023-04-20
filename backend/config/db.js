import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  // try {
  //   mongoose.set("strictQuery", false);
  //   const conn = await mongoose.connect(process.env.MONGO_URI, {
  //   })

  //   console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  // } catch (error) {
  //   console.error(`Error: ${error.message}`.red.underline.bold)
  //   process.exit(1)
  // }
  mongoose.set("strictQuery", false);

  mongoose
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
