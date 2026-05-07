import * as noteService from '../services/noteService.js';

export async function createNote(req, res) {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function getNote(req, res) {
  const note = await noteService.getNoteById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
}

export async function getUserNotes(req, res) {
  const notes = await noteService.getNotesByUser(req.params.userId);
  res.json(notes);
}

export async function updateNote(req, res) {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function deleteNote(req, res) {
  try {
    await noteService.deleteNote(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
