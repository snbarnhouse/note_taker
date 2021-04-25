const path = require('path');
const notes = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { Recoverable } = require('repl');

module.exports = app => {


    // API ROUTES

    // Setup the /api/notes get route
    app.get("/api/notes", function (req, res) {
        // Read the db.json file and return all saved notes as JSON.
        res.json(notes);
    });

    // Setup the /api/notes post route
    app.post("/api/notes", function (req, res) {
        // Receives a new note, adds it to db.json, then returns the new note
        req.body.id = uuidv4();
        let newNote = req.body;
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"),JSON.stringify(notes),err => {
            if (err) throw err;
            res.json(notes);
        });
        return console.log("Added new note: " + newNote.title);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", function (req, res) {
        // display json for the notes array indices of the provided id
        res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", function (req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Deleted note with id " + req.params.id);
    });




}

