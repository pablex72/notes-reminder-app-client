import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCategory from "./AddCategory.jsx";
import "../styles/CategoriesContainer.css";
import "../styles/CreateNote.css"
import { AiFillCloseSquare } from "react-icons/ai";

function CreateNote({ setCreatingNote, reflectChanges, setReflectChanges }) {
  const [newCategory, setNewCategory] = useState("");
  const [note, setNote] = useState({ title: "", content: "",tagList:[] , archived: false });
  const API_URL = "https://focused-mindfulness-production.up.railway.app/";

//
  function handleChange(e) {
    setNote(note => ({
      ...note,
      [e.target.name]: e.target.value
    }));
  }

  function handleNewCategory(e) {
    setNewCategory(e.target.value);
  }

async function handleSubmit() {  
  console.log("before post ", note);

  await axios.post( API_URL + "note/create", note)
    .then(response => {
      console.log(response);
      
    })
    .catch(error => {
      console.log(error);
    });
  setCreatingNote(false);
  setReflectChanges(!reflectChanges);
};

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
      <h3>Create Note</h3>
      <label>
        Title: <input name="title" onChange={(e) => handleChange(e)} />
      </label>
      <label>
        Content: <input name="content" onChange={(e) => handleChange(e)} />
      </label>
      <div className="categories-container" key={note.id}> 
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
        <button onClick={() => setCreatingNote(false)}>Cancel</button>
        <button onClick={() => handleSubmit()}>Save</button>
      </div>
    </div>
  );
}
export default CreateNote;