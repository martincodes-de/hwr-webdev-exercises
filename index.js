//Code erstellt userID für jede Sitzung, bei neuem Laden wird neue UserID erstellt
//wenn der User keine ID hat, kann dieser nicht auf die users.html zugreifen -> muss sich erstmal eine ID holen
const express = require("express");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const app = express();

const users = [];
var userID = undefined;

var favorites = {}

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  app.use("/", express.static("public"));
  if(req.cookies.userID === undefined){
    userID = Math.floor(Math.random() * 10000);
    users.push(userID);
    res.cookie("userID",userID)
  }
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/setLiked', (req, res) => {
  const userID_title = req.cookies.userID.toString()
  const title = req.body.title.toString()
  var arrayMovies = []

  if(favorites[userID_title] == undefined){
    favorites[userID_title] = []
  }else{
    arrayMovies = favorites[userID_title]
  }

  var moviedoesntexists = true;
  arrayMovies.forEach(element =>{ 
      if(element == title){
        moviedoesntexists = false;
      }
    }
  );
  
  if(moviedoesntexists == true){
    arrayMovies.push(title)
    favorites[userID_title] = arrayMovies
  }
});

app.get("/api/getliked", (req, res) => {
  res.send(JSON.stringify(favorites[req.cookies.userID]))
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

var allComments = {};

var movieJson = require(path.join(__dirname,'/public/src/movies.json'));

movieJson.forEach(movie => {
    allComments[movie.title] = [];
})

app.post("/api/comments/postcomment", (req,res) => {
    var title = req.body.title.toString();
    var userID = req.body.userID.toString();
    var comment = req.body.comment.toString();

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " - "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();
    var htmlOfComment = `<div class="comment">
                  <div class="comment_author"><h4>${userID}</h4></div>
                  <div class="comment_text">${comment}</div>
                  <div class="comment_timestamp">${datetime}</div>
                </div>`;
    allComments[title].push(htmlOfComment); 
});

app.get("/api/comments/getcomments/:title", (req,res) => {
    res.send(allComments[req.params.title]);
})

const display_comments = () => {
    console.log("display comments was executed");
    let listOfComments = "";
    for(let index = 0; index<=listOfTitles.length; index++){
        listOfTitles[index].forEach(comment => {
            var currentdate = new Date();
            var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes();
            listOfComments +=
                `<div class="comment">
                  <div class="comment_author"><h4>$userID</h4></div>
                  <div class="comment_text">${comment}</div>
                  <div class="comment_timestamp">${datetime}</div>
                </div>`;
        })
    }
}

function addComment(title){
    var comment = document.getElementById("submitButton").value;
    var titleIndex =0;
    switch (title){
        case "Es":
            titleIndex = 0;
            break;
        case "Fight Club":
            titleIndex = 1;
            break;
        case "1917":
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
        case "My Neighbor Totoro":
            titleIndex = 6;
            break;
        case "Princess Mononoke":
            titleIndex = 7;
            break;
        case "DjangoUnchained":
            titleIndex = 8;
            break;
        case "Maze Runner":
            titleIndex = 9;
            break;
        case "Howls Moving Castle":
            titleIndex = 10;
            break;
        default:
            titleIndex = 0;
    }
    listOfTitles[titleIndex].push(comment);
    display_comments();
}

app.listen(8080);

console.log('Server started juhuuu ');