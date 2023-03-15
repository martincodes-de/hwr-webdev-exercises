//Code erstellt userID für jede Sitzung, bei neuem Laden wird neue UserID erstellt
//wenn der User keine ID hat, kann dieser nicht auf die users.html zugreifen -> muss sich erstmal eine ID holen
const express = require("express");
const { v4: uuid } = require("uuid");
//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

const users = [];

app.use(cookieParser());
app.get("/", (req, res) => {
  app.use("/", express.static("public"));
  if(req.users === undefined) {
    console.log("neuer User wurde erstellt")
    const userID = Math.floor(Math.random() * 10000);
    users.push(userID);
    res.cookie("UserID", userID, {maxAge: 60*1000*60*60});
    console.log(req.users);
  }
  console.log(users);
  res.sendFile(path.join(__dirname, '/public/index.html'));
});



//app.use(express.static(__dirname + "/public"));
//app.use("/", express.static("public"));

/*app.get("/src/users", (req, res) => {
  if(req.cookies.userID !== undefined) {
    console.log("test");
    console.log(JSON.stringify(users));
    console.log(users.includes(req.cookies.userID));
    res.send(users[req.cookies.userID] || []);
  } else {
    console.log("keine cookies");
  }});

/*

app.get("/users/:id", (req, res) => {
  const userID = req.params.id;
  res.send(users.fond((user) => user.id === userID));
});

  if (req.cookies.userID !== undefined) {
    if (users.includes(req.cookies.userID)) {
      res.send("gut");
    }
    else {
      const userID = Math.floor(Math.random() * 10000);
      res.cookie("UserID", userID, {maxAge: 60*1000*60});
    }}
});

app.get(cookieParser());
app.use((req, _, next) => {
  console.debug(JSON.stringify(req.cookies));
  next();
});*/






/*app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
*/

app.listen(8080);

console.log('Server started juhuuu ');