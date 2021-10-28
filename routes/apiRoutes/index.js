const router = require('express').Router();
const notes = require('../../db/db.json');
const { createNewNote, deleteNote } = require('../../lib/notes')

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    const note = createNewNote(req.body, notes);
    res.json(notes);
});

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(notes);
});

module.exports = router;