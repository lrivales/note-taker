const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

function createNewNote(body, array) {
    const note = body;
    note.id = uniqid();
    array.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(array, null, 2)
    );
}

function deleteNote(id, array) {
    console.log(id);
    const result = array.findIndex(note => note.id === id);
    console.log(result);
    let removed = array.splice(result, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(array, null, 2)
    );
}

module.exports = { createNewNote, deleteNote };