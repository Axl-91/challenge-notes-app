import axios from "axios";
import { useEffect, useState } from "react";
import CreateNoteModal from "../components/CreateNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import ShowNoteModal from "../components/ShowNoteModal";
import NotesTable from "../components/NotesTable";

function UserNotes({ user }) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [noteSelected, setNoteSelected] = useState(null);

  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showMode, setShowMode] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/notes/user/${user.id}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [])

  const handleNewNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const handleNoteEdited = (updatedNote) => {
    setNotes(prevNotes => {
      return prevNotes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      );
    });
  };

  if (loading) return;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hi, {user.name}! Here are your notes</h1>

      <NotesTable
        notes={notes}
        setNotes={setNotes}
        setShowMode={setShowMode}
        setCreateMode={setCreateMode}
        setEditMode={setEditMode}
        setNoteSelected={setNoteSelected}
      />

      {showMode ?
        <ShowNoteModal
          note={noteSelected}
          onClose={() => setShowMode(false)}
        />
        : <></>}

      {createMode ?
        <CreateNoteModal
          onClose={() => setCreateMode(false)}
          userId={user.id}
          onNoteCreated={handleNewNote}
        />
        : <></>}

      {editMode ?
        <EditNoteModal
          note={noteSelected}
          onClose={() => setEditMode(false)}
          onNoteEdited={handleNoteEdited}
        />
        : <></>}
    </div>
  );
}

export default UserNotes;
