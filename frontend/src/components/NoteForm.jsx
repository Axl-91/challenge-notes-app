function NoteForm({ note, setNote }) {
  return (
    <>
      <label className="block text-gray-700" htmlFor="email">
        Title
      </label>
      <input
        type="text"
        placeholder="Title"
        value={note.title || ""}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="border mb-4 w-full p-2"
      />
      <label className="block text-gray-700" htmlFor="email">
        Tags
      </label>
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={note.tags && note.tags.join(",") || ""}
        onChange={(e) => setNote({ ...note, tags: e.target.value.split(',') })}
        className="border mb-4 w-full p-2"
      />
      <label className="block text-gray-700" htmlFor="email">
        Content
      </label>
      <textarea
        placeholder="Content"
        value={note.content || ""}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        className="border mb-4 w-full p-2"
      />
    </>
  )
}

export default NoteForm;
