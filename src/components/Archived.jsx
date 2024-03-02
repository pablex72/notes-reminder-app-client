import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "./Note";
import axios from "axios";
import EditNote from "./EditNote";
import "../styles/Archived.css"

export default function Archived() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [reflectChanges, setReflectChanges] = useState(false);
  const API_URL = "http://localhost:8080/";

  useEffect(() => {
    axios
      .get(API_URL + "note/archived", {
        params: {
          isArchived: true,
        }
      })
      .then(function (response) {
        setNotes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reflectChanges]);

  return (
    <>
      <div className="archived-container">
        <h1>Archived notes</h1>
        <Link
          style={{
            marginLeft: 24,
            textDecoration: "none",
            color: "black",
            backgroundColor: "white",
            padding: 12,
          }}
          to="/"
        >
          Active Notes
        </Link>
      </div>
      <section className="grid-1">
        {notes ? (
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
              reflectChanges={reflectChanges}
              setReflectChanges={setReflectChanges}
            />
          ))
        ) : (
          <p>Cargando</p>
        )}
        {editingNote && (
          <EditNote
            setEditingNote={setEditingNote}
            editingId={editingId}
            reflectChanges={reflectChanges}
            setReflectChanges={setReflectChanges}
          />
        )}
      </section>
    </>
  );
}
