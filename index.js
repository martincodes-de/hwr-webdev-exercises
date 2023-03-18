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

app.get('/api/movies', (req, res) => {
  var movieJson = require(path.join(__dirname, '/public/src/movies.json'));
  res.send(movieJson);
})


//window.onload = (event) => {
//  display_comments();
//}

app.post("/public/src/movie-page.html", (_,res)=> {
  display_comments();
}) 

var Es=[];
var FightClub = [];
var neunzenSiebzehn1917 = [];
var dhdr1 = [];
var dhdr2 = [];
var dhdr3 = [];
var MyNeighborTotoro = [];
var PrincessMononoke = [];
var DjangoUnchained = [];
var MazeRunner = [];
var HowlsMovingCastle = [];
var titles = {Es, FightClub, neunzenSiebzehn1917, dhdr1, dhdr2, dhdr3, MyNeighborTotoro, PrincessMononoke, DjangoUnchained, MazeRunner, HowlsMovingCastle};

const display_comments = () => {
    let listOfComments = "";
    for(let index = 0; index<=titles.length; index++){
    titles[index].forEach(comment => {
      var currentdate = new Date(); 
      var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
      listOfComments +=
                `<div class="comment">
                  <div class="comment_author"><h4>$userID</h4></div>
                  <div class="comment_text">${comment}</div>
                  <div class="comment_timestamp">${datetime}</div>
                </div>`;
    })
    listOfComments += '</div>';
    comments.innerHTML = list;
  }
}

function getComment(title){
  var comment = document.getElementById("submitButton").value;
  var titleIndex =0;
  switch (title){
  case "Es":
    titleIndex = 0;
    break;
  case "FightClub":
    titleIndex = 1;
    break;
  case "neunzenSiebzehn1917":
    titleIndex = 2;
    break;
  case "dhdr1":
      titleIndex = 3;
      break;
  case "dhdr2":
      titleIndex = 4;
      break;
  case "dhdr3":
      titleIndex = 5;
      break;
  case "MyNeighborTotoro":
      titleIndex = 6;
      break;
  case "PrincessMononoke":
      titleIndex = 7;
      break;
  case "DjangoUnchained":
    titleIndex = 8;
    break;
  case "MazeRunner":
    titleIndex = 9;
    break;
  case "HowlsMovingCastle":
    titleIndex = 10;
    break;
  default:
    titleIndex = 0;
  }
  titles[titleIndex].push(comment); 
  display_comments();
}

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