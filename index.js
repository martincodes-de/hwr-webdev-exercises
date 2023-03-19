//Code erstellt userID für jede Sitzung, bei neuem Laden wird neue UserID erstellt
//wenn der User keine ID hat, kann dieser nicht auf die users.html zugreifen -> muss sich erstmal eine ID holen
const express = require("express");
const { v4: uuid } = require("uuid");
//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

const users = [];
var userID = undefined;

app.use(cookieParser());

app.get("/", (req, res) => {
  app.use("/", express.static("public"));
  if(req.cookies.userID === undefined){
    console.log("neuer User wird erstellt")
    userID = Math.floor(Math.random() * 10000);
    users.push(userID); 
    res.cookie("new userID",userID)
  }
  console.log(users);
  console.log("after if", userID);
  res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.get('/api/movies', (req, res) => {
  var movieJson = require(path.join(__dirname, '/public/src/movies.json'));
  res.send(movieJson);
});

app.get('/movie/:title', (req, res) => {
  var movieList = require(path.join(__dirname, '/public/src/movies.json'));
  var movie = {};
  for (let index = 0; index < movieList.length; index++) {
    if (movieList[index].title == req.params.title) {
      movie = movieList[index];
    }
  }
  res.sendFile(__dirname + '/public/movie-page.html');
});

//Denis eingefügter shit :D
// app.get("/anmelden", (_, res) => {
//   res.cookie("keks_z", 1, { maxAge: 120000 });
//   console.log("cookie da :D")
//   res.send("Anmeldung erfolgreich");
// });

app.post("/", (_, res) => {
  //soll beim Laden jeder Filmseite zugehörige Kommentare darstellen/ausgeben
});

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
    titles[index].forEach(comment => { //Es => Var für jede Liste
      listOfComments +=
                `<div class="movie" id="title"">
                        <h3>$userID</h3> //Get userID of User (idk how)
                        <p>${comment}</p>
                </div>`;
    })
    listOfComments += '</div>';
    comments.innerHTML = list;
  }
}

function getComment(title){ //title soll Platzhalter
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
  case "HowlsMovingCastle":
    titleIndex = 9;
    break;
  case "MazeRunner":
    titleIndex = 10;
    break;
  default:
    titleIndex = 0;
  }

  titles[titleIndex].push(comment); //Add content to Filmlist => title
  display_comments();
}
// var comment = {
//   Name: userID,
//   Kommentar: comment
// }
// var movies = {
//   Titel: movietitel,
//   Comments: comments
// }





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