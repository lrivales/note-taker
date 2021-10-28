const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');
const express = require('express');
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
const { notDeepEqual } = require('assert');

const app = express();

app.use(express.urlencoded({ extended:true }));

app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, array) {
    const note = body;
    note.id = uniqid();
    array.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(array, null, 2)
    );
}

function deleteNote(id, array) {
    console.log(id);
    const result = array.findIndex(note => note.id === id);
    console.log(result);
    let removed = array.splice(result, 1);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(array, null, 2)
    );
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const note = createNewNote(req.body, notes);
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(notes);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});