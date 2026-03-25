"use client";

import { useNotes } from "../hooks/useNote";



export default function Home() {
  const {
    notes,
    input,
    editingId,
    setInput,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
  } = useNotes();

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      
      <h1 className="text-3xl font-bold mb-6 text-black">Offline Notes</h1>

      <div className="w-full max-w-xl flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 text-black p-3 rounded-xl border border-gray-300 focus:outline-none"
        />

        <button
          onClick={handleAddOrUpdate}
          className="bg-black text-white px-4 rounded-xl"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      <div className="grid text-black grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-2xl shadow-sm border"
          >
            <p className="mb-4">{note.content}</p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(note)}
                className="text-sm px-3 py-1 rounded-lg border"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="text-sm px-3 py-1 rounded-lg bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}