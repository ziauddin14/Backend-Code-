import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const users = [];

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = users.find((obj) => obj.email === email);
  if (isUserExist) {
    return res.send({
      message: `User already exists against this ${email}`,
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userObj = {
    name,
    email,
    password: hashedPassword,
    id: Date.now(),
    token: "",
  };
  users.push(userObj);
  return res.send({
    message: `User created successfully`,
    user: userObj,
  });
};

const signinUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((obj) => obj.email === email);
  if (!user) {
    return res.send({
      message: `User not found against this ${email}`,
    });
  }
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    return res.send({
      message: `Invalid password`,
    });
  }
  const payload = {
    email: user.email,
    id: user.id,
  };
  const secretKey = "your_secret_key";
  const Options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secretKey, Options);
  return res.send({
    message: `User signed in successfully`,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
      token: user.token,
    },
  });
};


const getAllUsers = (req, res) => {
  return res.send({
    message: `List of all users`,
    users,
  });
};
export { createUser, signinUser, getAllUsers };
