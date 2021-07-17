var express = require("express");
var path = require("path");
var fs = require("fs");
var dbJSON = require("./db/db.json");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

let noteData = dbJSON;

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    noteData.push(newNote);
    noteData.map((noteObject, i) => noteObject.id = i + 1);
    writeJSONfile(noteData, res);
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

function writeJSONfile(jsonArray, res) {
    fs.writeFile("./db/db.json", JSON.stringify(jsonArray), function () {
        res.json(jsonArray);
    });  
}

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});