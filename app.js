// console.log("Hello World!");
// const num1 = 20
// const num2 = 20
// console.log(num1+num2);
const http = require("http");
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
server.listen(5000);
console.log("Server Start....");

// ...existing code...

/*
Roman Urdu Explanation (Line by Line):

// 1-3: Ye lines comment hain, yahan console.log aur variables ka example diya gaya hai.
// 4: 'http' module ko require kiya gaya hai, server banane ke liye.
// 5: 'fs' module ko require kiya gaya hai, file system se related kaam ke liye.
// 6: 'path' module ko require kiya gaya hai, file path handle karne ke liye.
// 7: 'filePath' variable banaya gaya hai, jo current directory mein 'text.txt' file ka path set karta hai.
// 8: 'server' variable mein HTTP server create kiya gaya hai.
// 9: Server pe request aati hai, usko handle karne ke liye callback function diya hai.
// 10: Agar request ka URL '/' hai, to 'Hello World!' response bhej diya jata hai.
// 11: Response ko end kar diya jata hai.
// 12: Agar request ka URL '/form' hai, to HTML form ka response bheja jata hai.
// 13: Response ka content type 'text/html' set kiya gaya hai.
// 14-18: Ek HTML form bheja gaya hai, jismein input aur button hai.
// 19: Response ko end kar diya jata hai.
// 20: Agar request ka URL '/submit' hai, to yahan form ka data handle hota hai.
// 21: 'data' variable banaya gaya hai, jismein form ka data store hota hai.
// 22: Jab bhi data aata hai, usko 'chunks' mein add karte hain.
// 23: Data ko 'data' variable mein concatenate karte hain.
// 24: Jab data pura aajata hai ('end' event), tab file mein likhte hain.
// 25: 'fs.writeFile' se 'filePath' pe data likha jata hai.
// 26: Agar error aaye to 'Server Crash' response bheja jata hai.
// 27: Response ko end kar diya jata hai.
// 28: Agar sab sahi ho to 'Data Recieved Successfully' response bheja jata hai.
// 29: Response ko end kar diya jata hai.
// 30: Agar koi aur URL ho to '404 Not Found' response bheja jata hai.
// 31: Response ko end kar diya jata hai.
// 32: Server ko port 5000 pe listen karne ke liye kaha gaya hai.
// 33: Console pe 'Server Start....' print hota hai.

Node.js Methods Used (Explanation):

- require(): Module ko import karne ke liye use hota hai.
- http.createServer(): Naya HTTP server banata hai.
- server.listen(): Server ko specific port pe start karta hai.
- res.write(): Client ko response bhejne ke liye use hota hai.
- res.end(): Response ko khatam karne ke liye use hota hai.
- res.setHeader(): Response ka header set karne ke liye use hota hai.
- req.on(): Request pe event listen karne ke liye use hota hai (jaise 'data' aur 'end').
- fs.writeFile(): File mein data likhne ke liye use hota hai.
- path.join(): File path ko sahi format mein banane ke liye use hota hai.
- process.cwd(): Current working directory ka path lene ke liye use hota hai.
