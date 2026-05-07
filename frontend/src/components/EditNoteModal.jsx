import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm';

function parseNote(note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    tags: note.tags.map(tag => tag.name)
  }
}

const EditNoteModal = ({ note, onClose, onNoteEdited }) => {
  const [updatedNote, setUpdatedNote] = useState({});
  const [error, setError] = useState(null)

  useEffect(() => {
    setUpdatedNote(parseNote(note))
  }, [])

  const handleEditNote = () => {
    axios.put(`http://localhost:3000/api/notes/${updatedNote.id}`, updatedNote)
      .then((res) => {
        onNoteEdited(res.data);
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
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        {error ? <span className='text-red-500'> {error} </span> : ""}
        <NoteForm note={updatedNote} setNote={setUpdatedNote} />
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mr-2 cursor-pointer">Cancel</button>
          <button onClick={handleEditNote} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;

