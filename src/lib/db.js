import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MondoDB Connected Successfully");
  } catch (error) {
    console.log("error", error);
  }
};

export default dbConnection;
