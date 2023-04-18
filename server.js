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
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// route to home page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// route to read /db/db.json and return stored data
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// post route
app.post("/api/notes", (req, res) => {
  let notes = JSON.parse(fs.readFileSync("db/db.json"));
//   console.log(notes);
  let newNotes = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random()*1000)
  }

  notes.push(newNotes)


  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(notes);

//   console.log(notes);
});

//

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
