// Class 01 Basics
// console.log("Hello World!");
// const num1 = 20
// const num2 = 20
// console.log(num1+num2);
/*const http = require("http");
const fs = require("fs");
const path = require("path");
const filePath = path.join(process.cwd(), "text.txt");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Hello World!");
    res.end();
  } else if (req.url === "/form") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <form action='/submit' method="POST">
        <input name="name" placeholder="Enter Your Name" />
        <button type="submit">Submit</button>
        </form>
        `);
    res.end();
  } else if (req.url === "/submit") {
    let data = "";
    req.on("data", (chunks) => {
      data += chunks;
    });
    req.on("end", () => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          res.write("Server Crash");
          res.end();
        } else {
          res.write("Data Recieved Successfully");
          res.end();
        }
      });
    });
  } else {
    res.write("404 Not Found");
    res.end();
  }
});
server.listen(3000);
console.log("Server Start....");
*/
// Class 02 Express Basic
// import express from "express";
// import bodyParser from "body-parser";
// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use((req, res, next) => {
// //   console.log("Request Received");
// //   req.data = "Zia Uddin is a Very Good Developer  and Teacher";
// //   next();
// // });

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });
// app.get("/form", (req, res) => {
//   res.send(`
//         <form action='/submit' method="POST">
//         <input name="name" placeholder="Enter Your Name" />
//         <button type="submit">Submit</button>
//         </form>
//         `);
// });
// app.post("/submit", (req, res) => {
//   console.log(req.body);
//   res.send("Data Recieved Successfully");
// });
// app.listen(3000);

// Class 03 Todo

import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './src/controller/routes/todo.js';
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', todoRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
console.log("Server Start....");
