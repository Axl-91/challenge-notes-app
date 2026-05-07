const ShowNoteModal = ({ onClose, note }) => {
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  }

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center bg-black/70 modal-overlay">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {note.title}
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner h-full">
          <p className="whitespace-pre-wrap text-gray-700">
            {note.content}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800 font-semibold transition duration-200 ease-in-out cursor-pointer">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowNoteModal;
