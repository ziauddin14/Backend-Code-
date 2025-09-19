// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/user.js";
// const secretKey = "123456789abcdef"; // Ideally should be in env variable
// // DB Connection mongodb+srv://zu37216_db_user:ScmwkS4SMSsyHSRT@cluster0.le4pope.mongodb.net/

// const createUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const isUserExist = await User.findOne({email});
//   if (isUserExist) {
//     return res.send({
//       message: `User already exists against this ${email}`,
//     });
//   }
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   const userObj = {
//     name,
//     email,
//     password: hashedPassword,
//     id: Date.now(),
//     token: "",
//   };
//   await User.create(userObj)
//   return res.send({
//     message: `User created successfully`,
//     user: userObj,
//   });
// };

// const signinUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({email});
//   if (!user) {
//     return res.send({
//       message: `User not found against this ${email}`,
//     });
//   }
//   const isPasswordMatch =  bcrypt.compareSync(password, user.password);
//   if (!isPasswordMatch) {
//     return res.send({
//       message: `Invalid password`,
//     });
//   }
//   const payload = {
//     email: user.email,
//     id: user.id,
//   };
//   const secretKey =  "123456789abcdef"; // Ideally should be in env variable
//   const Options = {
//     expiresIn: "1d",
//   };
//   const token = jwt.sign(payload, secretKey, Options);
//   return res.send({
//     message: `User signed in successfully`,
//     user: {
//       name: user.name,
//       email: user.email,
//       id: user.id,
//       token: token,
//     },
//   });
// };


// const getAllUsers = async(req, res) => {
//   const allUser = await User.find({})
//   return res.send({
//    allUser
//   });
// };
// export { createUser, signinUser, getAllUsers };
