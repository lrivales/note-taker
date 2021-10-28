const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
const { createNewNote, deleteNote } = require('./lib/notes')

const app = express();

app.use(express.urlencoded({ extended:true }));

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});