require('dotenv').config();

const express = require('express');
const router = express.Router();

const db = require('../../db');

// endpoints;
//  create
router.put('/addNote', (req, res) => {
  try {
    const newNote = {
      publicId: req.body.publicId,
      title: req.body.title,
      description: req.body.description,
    };

    db.addNote(newNote).then((result) => res.send(result));
  } catch (e) {
    res.status(500);
    res.end();
  }
});

//  read
router.get('/getNotes', (req, res) => {
  try {
    db.getNotes().then((result) => res.send(result));
  } catch (e) {
    res.status(500);
    res.end();
  }
});

router.get('/getNote/:noteId', (req, res) => {
  try {
    db.getNote(req.params.noteId).then((result) => res.send(result));
  } catch (e) {
    res.status(500);
    res.end();
  }
});

//  update
router.patch('/updateNote/:noteId', (req, res) => {
  try {
    const newNote = {
      publicId: req.body.publicId,
      title: req.body.title,
      description: req.body.description,
      noteId: req.params.noteId,
    };
    db.updateNote(newNote).then((result) => res.send(result));
  } catch (e) {
    res.status(500);
    res.end();
  }
});

//  delete
router.delete('/deleteNote/:noteId', (req, res) => {
  try {
    db.deleteNote(req.params.noteId).then((result) => res.send(result));
  } catch (e) {
    res.status(500);
    res.end();
  }
});

module.exports = router;
