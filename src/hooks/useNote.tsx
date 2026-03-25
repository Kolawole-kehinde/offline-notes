import { useState } from "react";

export type Note = {
  id: string;
  content: string;
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleAddOrUpdate() {
    if (!input.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingId ? { ...note, content: input } : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        content: input,
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setInput("");
  }

  function handleEdit(note: Note) {
    setInput(note.content);
    setEditingId(note.id);
  }

  function handleDelete(id: string) {
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