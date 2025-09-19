// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true // Removes whitespace from both ends of a string
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensures email addresses are unique
//   },
//   password: {
//     type: String,
//     required: true,
//     length:6
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now // Sets default value to the current date and time
//   }
// });

// // Create a Mongoose Model from the schema
// const User = mongoose.model('User', userSchema); //collection rule is name singular nhi hoga

// export default User