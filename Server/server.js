// Basic server setup with nodemailer and express
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zu37216@gmail.com",
    pass: "rxze vdae kfpq sovx",
  },
});
// const mailOptions = {
//   from: "zu37216@gmail.com",
//   to: "uzia1910@gmail.com",
//   subject: "Hello ✔",
//   text: "Hello world?",
//   html: "<b>Hello world?</b>",
// };
// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;
  const adminMailOptions = {
    from: "zu37216@gmail.com",
    to: "uzia1910@gmail.com",
    subject: `New Contact Form Submission ${name}`,
     html: `
      <h3>New message received from Human Healthcare website</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };
  const userMailOptions = {
    from: "zu37216@gmail.com",
    to: email,
    subject: `Thank you for contacting Human Healthcare, ${name}`,
     html: `
      <h3>Thank you for reaching out!</h3>
      <p>We have received your message and will get back to you shortly.</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };
  try {
    const info = await transporter.sendMail(adminMailOptions);
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log("Email sent: " + info.response + " to admin" + userInfo.response + " to user");
    res.send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.send("Error sending email");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;