import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "./Note";
import axios from "axios";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import "../styles/Home.css";

export default function Home({ isArchived }) {
  const [notes, setNotes] = useState([]);
  const [creatingNote, setCreatingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState("default");
  const [reflectChanges, setReflectChanges] = useState(false);
  const API_URL = "http://localhost:8080/";

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(API_URL + "note/active")
        .then(function (response) {
          let filteredNotes = response.data;
          if (filterName !== "default") {
            filteredNotes = response.data.filter(note => 
              note.tagList.some(tag => tag.name === filterName)
            );
          }
          setNotes(filteredNotes);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
    }, [isArchived, reflectChanges, filterName]);
    

  useEffect(() => {
    console.log("Categories useEffect");
    axios
      .get(API_URL + "tag")
      .then(function (response) {
        setCategories(response.data);
        console.log("response.data categories ",response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reflectChanges]);

  async function handleSelect(e) {
    setFilterName(e.target.value);
  }

  return (
    <>
      <div className="container">
        <h1>Notes and categories reminder</h1>
      </div>
      {creatingNote && (
        <CreateNote
          setCreatingNote={setCreatingNote}
          reflectChanges={reflectChanges}
          setReflectChanges={setReflectChanges}
        />
      )}
      {editingNote && (
        <EditNote
          setEditingNote={setEditingNote}
          editingId={editingId}
          reflectChanges={reflectChanges}
          setReflectChanges={setReflectChanges}
        />
      )}

      <div className="categoryContainer">
        <h4>Filter notes by category</h4>
        <select
          className="selectCategory"
          name="select"
          onChange={(e) => handleSelect(e)}
        >
          <option value="default">All categories</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        <div className="buttonContainer">
          <button
            className="createButton"
            onClick={() => setCreatingNote(true)}
          >
            Create note
          </button>
          <Link className="archiveButton" to="/archived">
            Archived notes
          </Link>
        </div>
      </div>
      
      <section className="grid-1">
        {notes &&
          notes.map((note) => (
            <Note
              key={note.id}
              setEditingNote={setEditingNote}
              setEditingId={setEditingId}
              note={note}
              reflectChanges={reflectChanges}
              setReflectChanges={setReflectChanges}
            />
          ))}
      </section>
    </>
  );
}
