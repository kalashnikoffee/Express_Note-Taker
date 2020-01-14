const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const dbPath = path.join(__dirname, "db", "db.json");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
app.get("/api/notes", async function(req, res) {
    try {
      const notes = getNotes();
      return res.send(notes);
    } catch (err) {
      console.log(err);
    }
  });
app.post("/api/notes", function(req, res) {
    let notes = getNotes();
    let ids = getIdNums();
    let newNote = req.body;
    for (let i = 1; i <= Object.keys(ids).length + 1; i++) {
      if (!ids[i]) {
        newNote.id = i;
        ids[i] = true;
        break;
      }
    }
    notes.push(newNote);
    writeFileAsync(dbPath, JSON.stringify(notes));
    res.send(notes);
  });