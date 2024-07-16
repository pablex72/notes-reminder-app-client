import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/EditNote.css";
import AddCategory from "./AddCategory.jsx";
import "../styles/CategoriesContainer.css";
import { AiFillCloseSquare } from "react-icons/ai";

function EditNote({ setEditingNote, editingId, reflectChanges, setReflectChanges }) {
  const [newCategory, setNewCategory] = useState("");
  const [note, setNote] = useState({ title: "", content: "", archived: false});
  const API_URL = "https://focused-mindfulness-production.up.railway.app/";
  
  function handleChange(e) {
    setNote(note => ({
      ...note,
      [e.target.name]: e.target.value
    }));
  }

  function handleNewCategory(e) {
    setNewCategory(e.target.value);
  }

  useEffect(() => {
    axios
      .get(API_URL + `note/${editingId}`)
      .then((response) => {
        setNote(response.data[0]);
      }) 
      .catch((error)=>{
        console.log(error);
      });
  }, [editingId]);

  async function handleSubmit() {
     await axios.patch(API_URL + `note/update/${note.id}`, note)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    setEditingNote(false);
    setReflectChanges(!reflectChanges);
  }

    function createNewCategoryPrev() {
      if (newCategory.trim() !== "") {
        setNote(note => ({
          ...note,
          tagList: [...note.tagList, { name: newCategory }]
      }));
      setNewCategory('');
        }
    }

    function handleRemoveTag(name) {
      setNote(note => ({
        ...note, 
          tagList: note.tagList.filter(tag => tag.name !== name)
      }));
    }

  return (
    <div className="edit-form" >
      <h3>Edit Note</h3>
      <label>
        Title:
        <input
          name="title"
          value={note.title}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label>
        Content:
        <input
          name="content"
          value={note.content}
          onChange={(e) => handleChange(e)}
        />
      </label>

      <div className="categories-container">
        {note.tagList &&
          note.tagList.map((category) => (
            <div className="edit-container">
              <div className="category-texto">
                {category.name}
              </div>  
              <div className="edit-container-icons" onClick={() => handleRemoveTag(category.name)} >
                <AiFillCloseSquare className="delete-icono" 
                />
              </div>
            </div>
          ))}
      </div>
      <AddCategory
        newCategory={newCategory}
        handleNewCategory={handleNewCategory}
        createNewCategoryPrev={createNewCategoryPrev}
      />
      <div className="buttons-container">
        <button onClick={() => setEditingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save</button>
      </div>
    </div>
  );
}

export default EditNote;
