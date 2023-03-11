const express = require("express");
//const cookieParser = require("cookie-parser");
var cookieSession = require('cookie-session')
const path = require('path');
const app = express();


/*
app.use(cookieParser());
app.use((req, _, next) => {
  console.log(JSON.stringify(req.cookies));
  next();
});

app.get("/anmelden", (_, res) => {
  res.cookie("keks_z", 1, { maxAge: 120000 });
  res.send("Anmeldung erfolgreich");
});
*/
app.use(cookieSession({
  name: 'session_Denis',
  keys: [0],

  // Cookie Options
  maxAge: 5 * 60 * 1000 // 24 hours
}))


app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(8080);

console.log('Server started juhuuu ');