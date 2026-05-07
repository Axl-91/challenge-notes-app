import express from 'express';
import * as noteController from '../controllers/noteController.js';

const router = express.Router();

router.post('/', noteController.createNote);
router.get('/:id', noteController.getNote);
router.get('/user/:userId', noteController.getUserNotes);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;
