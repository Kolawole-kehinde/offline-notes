import { openDB } from "idb";

const DB_NAME = "notes-db";
const STORE_NAME = "notes";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

// Add note
export async function addNote(note: any) {
  const db = await dbPromise;
  return db.put(STORE_NAME, note);
}

// Get all notes
export async function getNotes() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}

// Update note
export async function updateNote(note: any) {
  const db = await dbPromise;
  return db.put(STORE_NAME, note);
}

// Delete note
export async function deleteNote(id: string) {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
}