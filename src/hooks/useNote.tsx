import { useEffect, useState } from "react";
import { addNote, deleteNote, getNotes, updateNote } from "../lib/db";

export type Note = {
  id: string;
  content: string;
};



export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);


  useEffect(() => {
  async function loadNotes() {
    const storedNotes = await getNotes();
    setNotes(storedNotes);
  }

  loadNotes();
}, []);

  async function handleAddOrUpdate() {
  if (!input.trim()) return;

  if (editingId) {
    const updated = { id: editingId, content: input };
    await updateNote(updated);
    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingId ? updated : note
      )
    );

    setEditingId(null);
  } else {
    const newNote = {
      id: crypto.randomUUID(),
      content: input,
    };
    await addNote(newNote);
    setNotes((prev) => [newNote, ...prev]);
  }
  setInput("");
}


  function handleEdit(note: Note) {
    setInput(note.content);
    setEditingId(note.id);
  }

async function handleDelete(id: string) {
  await deleteNote(id);
  setNotes((prev) => prev.filter((note) => note.id !== id));
}

  return {
    notes,
    input,
    editingId,
    setInput,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
  };
}