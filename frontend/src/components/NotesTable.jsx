import axios from "axios";
import moment from "moment-timezone";
import { useState } from "react";

function formatDate(date) {
  return moment(date).tz("America/Argentina/Buenos_Aires").format("DD/MM/YYYY HH:mm")
}

function NotesTable({ notes, setNotes, setShowMode, setCreateMode, setEditMode, setNoteSelected }) {
  const [showArchived, setShowArchived] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const uniqueTags = [...new Set(notes.flatMap(note => note.tags.map(tag => tag.name)))];

  // Filter notes and sort by createdAt
  const filteredNotes = notes.filter(note => {
    const isArchived = showArchived ? note.archived : !note.archived;
    const noteTags = note.tags.map(tag => tag.name);
    const hasSelectedTag = selectedTag ? noteTags.includes(selectedTag) : true;

    return isArchived && hasSelectedTag;
  }).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const handleArchive = (note) => {
    axios
      .put(`http://localhost:3000/api/notes/${note.id}`, { archived: !note.archived })
      .then(() => {
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === note.id ? { ...n, archived: !n.archived } : n))
        );
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-4">
          <button
            onClick={() => setShowArchived(false)}
            className={`mr-2 px-4 py-2 rounded transition duration-500 ${!showArchived ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400 cursor-pointer"}`}
          >
            Active Notes
          </button>
          <button
            onClick={() => setShowArchived(true)}
            className={`px-4 py-2 rounded transition duration-500 ${showArchived ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400 cursor-pointer"}`}
          >
            Archived Notes
          </button>
        </div>
        <div className="space-x-2">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Tags</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <button
            onClick={() => setCreateMode(true)}
            className="px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer">
            Create Note
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-blue-300 shadow-md">
        <thead>
          <tr className="bg-blue-300 border border-blue-500">
            <th className="w-1/4 py-2 px-4 text-left">Title</th>
            <th className="w-1/4 py-2 px-4 text-left">Categories</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map(note => (
            <tr key={note.id} className="hover:bg-gray-100 border border-blue-300 transition duration-300">
              <td className="py-2 px-4">{note.title}</td>
              <td className="py-2 px-4">{note.tags.length === 0 ? "-" : note.tags.map(t => t.name).join(",")}</td>
              <td className="py-2 px-4">{formatDate(note.createdAt)}</td>
              <td className="py-2 space-x-2 flex justify-center items-center">
                <button
                  onClick={() => {
                    setShowMode(true)
                    setNoteSelected(note)
                  }}
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer">
                  Show
                </button>
                <button
                  onClick={() => {
                    setEditMode(true)
                    setNoteSelected(note)
                  }}
                  className="px-2 py-2 bg-green-500 hover:bg-green-700 text-white rounded cursor-pointer">
                  Edit
                </button>
                <button
                  onClick={() => handleArchive(note)}
                  className="px-2 py-2 bg-yellow-500 hover:bg-yellow-700 text-white rounded cursor-pointer">
                  {note.archived ? "Unarchive" : "Archive"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default NotesTable
