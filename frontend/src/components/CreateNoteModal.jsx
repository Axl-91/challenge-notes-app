import { useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';

const CreateNoteModal = ({ onClose, userId, onNoteCreated }) => {
  const [newNote, setNewNote] = useState({ title: '', tags: [], content: '' });
  const [error, setError] = useState(null)

  const handleCreateNote = () => {
    axios.post(`http://localhost:3000/api/notes`, { ...newNote, userId })
      .then((res) => {
        onNoteCreated(res.data);
        setNewNote({ title: '', tags: [], content: '' });
        onClose();
      })
      .catch((err) => setError(err.response.data.error));
  };
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  }
  return (
    <div onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center bg-black/70 modal-overlay">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Create Note</h2>
        {error ? <span className='text-red-500'> {error} </span> : ""}
        <NoteForm note={newNote} setNote={setNewNote} />
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2 cursor-pointer">Cancel</button>
          <button onClick={handleCreateNote} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer">Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;

