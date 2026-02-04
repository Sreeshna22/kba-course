import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    const note = new Note({ text });
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
