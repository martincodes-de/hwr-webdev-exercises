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
  //res.cookie(userID);
  if(req.cookies.userID === undefined){
    console.log("neuer User wird erstellt")
    userID = Math.floor(Math.random() * 10000);
    users.push(userID);
    res.cookie("userID",userID)
  }
  console.log(users);
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


// var comment = {
//   Name: userID,
//   Kommentar: comment
// }
// var movies = {
//   Titel: movietitel,
//   Comments: comments
// }






//window.onload = (event) => {
//  display_comments();
//}

var allComments = {};

var movieJson = require(path.join(__dirname,'/public/src/movies.json'));

movieJson.forEach(movie => {
    allComments[movie.title] = [];
})

app.post("/api/comments/postcomment", (req,res) => {
    console.log("postcomment API was called")

    //console.log(req.body.title);
    //console.log(req.body.userID);
    //console.log(req.body.comment);
    //console.log(req.body);
    //console.log(req.header);

    var title = req.body.title.toString();
    var userID = req.body.userID.toString();
    var comment = req.body.comment.toString();

    console.log("Von: " + title + " UserID: " + userID + " Kommentar der geschrieben wurde: " + comment);
    console.log(req.body)

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
    allComments[title].push(htmlOfComment); //html als String abgespeichert
    //Website und neuen Kommentar laden hinzufügen
});

app.get("/api/comments/getcomments/:title", (req,res) => {
    res.send(allComments[req.params.title]);
})

//app.post("/public/src/movie-page.html", (_,res)=> {
//  display_comments();
//})

const display_comments = () => {
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
        // listOfComments += '</div>';
        // comments.innerHTML = list;
        // Das muss in die Listen rein
        //Inhalt von Listen auf die Webseite bekommen. Wie???
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