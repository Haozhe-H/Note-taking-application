const fs = require("fs");
const express = require("express");
const path = require("path");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// route to notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// route to home page
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// route to read /db/db.json and return stored data
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// path.join(__dirname, "/db/db.json")
// post route
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var notes = JSON.parse(data);
    let newNotes = {
      title: req.body.title,
      text: req.body.text,
      id: Math.floor(Math.random() * 1000),
    };
    notes.push(newNotes);

    fs.writeFile(
      "./db/db.json",
      JSON.stringify(notes, null, 2),
      (err, data) => {
        if (err) throw err;
        res.json(newNotes);
      }
    );
  });
  //   console.log(notes);
});

// delete route
app.delete("/api/notes/:id", (req, res) => {
  // console.log(req.params.id);
  let notesId = req.params.id;
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    // console.log(notes);
    let deletedNotes = notes.filter((note) => note.id != notesId);
    fs.writeFile(
      "./db/db.json",
      JSON.stringify(deletedNotes, null, 2),
      (err) => {
        if (err) console.log(err);
        res.json(deletedNotes);
      }
    );
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
