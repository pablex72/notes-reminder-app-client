import React, { useState } from "react";
import "../styles/Note.css";
import "../styles/Buttons.css";
 
import axios from "axios";
import DeleteNote from "./DeleteNote";

export default function Note({
  note,
  setEditingNote,
  setEditingId,
  reflectChanges,
  setReflectChanges,
}) {
  const { id, title, content, archived, tagList } = note;
  const categories= tagList;
  const [deletingNote, setDeletingNote] = useState(false);
  const API_URL = "https://notes-reminder-backend.onrender.com/";

  const handleDelete = async () => {
    await axios
      .delete(API_URL + `note/delete/${id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  const handleArchive = async () => {
    await axios
      .patch(
        API_URL + `note/archived/${id}`,
        { archived: !archived }
      )
      .then((response) => {
        console.log(`Updated post with ID ${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    setReflectChanges(!reflectChanges);
  };

  const handleUpdate = () => {
    setEditingId(id);
    setEditingNote(true);
    setReflectChanges(!reflectChanges);
  };

  return (
    <div key={id} className="item">
      <h3>Title</h3> 
      <p>{title}</p>
      <h3>Content</h3>
      <p>{content}</p>
      <div className="buttons-container">
  <button className={`button ${archived ? "archive-button" : "unarchive-button"}`} onClick={handleArchive}>
    {archived ? "Unarchive" : "Archive"}
  </button>
  <button className="button update-button" onClick={handleUpdate}>
    Update
  </button>
  <button className="button delete-button" onClick={() => setDeletingNote(true)}>
    Delete
  </button>
</div>

      {deletingNote && (
        <DeleteNote
          handleDelete={handleDelete}
          setDeletingNote={setDeletingNote}
        />
      )}
    </div>
  );
}
