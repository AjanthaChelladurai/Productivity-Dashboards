import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "diaryNotes";

// 🎨 TRUE RANDOM PASTEL COLOR
const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 80%, 85%)`;
};

const Diary = () => {
  // ✅ LOAD FROM localStorage (safe)
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ SAVE TO localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const openNewModal = () => {
    setText("");
    setEditId(null);
    setIsOpen(true);
  };

  const openEditModal = (note) => {
    setText(note.text);
    setEditId(note.id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setText("");
    setEditId(null);
  };

  const saveNote = () => {
    if (!text.trim()) return;

    const now = new Date();

    if (editId) {
      // ✏️ EDIT
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editId ? { ...n, text } : n
        )
      );
    } else {
      // ➕ ADD
      const newNote = {
        id: Date.now(),
        text,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        color: getRandomColor(),
      };

      setNotes((prev) => [newNote, ...prev]);
    }

    closeModal();
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openNewModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-green-600 text-white font-medium m-5"
        >
          <FaPlus /> New Note
        </button>
      </div>

      {/* NOTES */}
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No notes yet. Click <b>New Note</b>
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="p-4 rounded-xl shadow relative"
                style={{ backgroundColor: note.color }}
              >
                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-3">
                  <button
                    onClick={() => openEditModal(note)}
                    className="text-gray-700 hover:text-black"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-gray-700 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>

                <p className="whitespace-pre-line text-gray-800 mt-4">
                  {note.text}
                </p>

                <div className="text-xs text-gray-600 mt-4 text-right">
                  <div>{note.date}</div>
                  <div>{note.time}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl p-6 w-[90%] max-w-md"
            >
              <h2 className="text-lg font-bold text-blue-800 mb-4">
                {editId ? "Edit Note" : "New Diary Note"}
              </h2>

              <textarea
                rows={6}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your note..."
                className="w-full border rounded-lg p-3 mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>

                <button
                  onClick={saveNote}
                  className="px-4 py-2 rounded-lg bg-sky-500 text-white"
                >
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Diary;
