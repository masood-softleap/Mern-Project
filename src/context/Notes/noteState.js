import React, { useState } from "react";
import noteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:3000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)
// getallnotes

const getAllNotes = async () => {
  console.log("getting all notes")

  const response = await fetch(`${host}/api/notes/getAllNotes`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')    }
  });
  const json= await response.json();
  console.log(json)
  setNotes(json)
  
  
}




  // add note
  const addNote = async (title, description, tag) => {
    console.log("adding a new note")

    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMmJkZWY2ZDFmNWRkZDIwMjUxNDBjIn0sImlhdCI6MTcwODMxMDAxOH0.w7AWjU6mjwLcehAInDwLOzmNduXjArqZ93l8ZAAR180"
      }, body: JSON.stringify({title,description,tag}),
    });
    const json=await response.json();
    const note = {
     
      title, description, tag,
    
    }
    setNotes(notes.concat(note))
  }
  // edit note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMmJkZWY2ZDFmNWRkZDIwMjUxNDBjIn0sImlhdCI6MTcwODMxMDAxOH0.w7AWjU6mjwLcehAInDwLOzmNduXjArqZ93l8ZAAR180"
      }, body: JSON.stringify({title,description,tag}),
    });
  let newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
  }
setNotes(newNotes)
}
// delete note
const deleteNote =async (id) => {
  const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMmJkZWY2ZDFmNWRkZDIwMjUxNDBjIn0sImlhdCI6MTcwODMxMDAxOH0.w7AWjU6mjwLcehAInDwLOzmNduXjArqZ93l8ZAAR180"
    }
  });
  const json=response.json();

  const newNote = notes.filter((note) => { return note._id !== id })

  setNotes(newNote)

}
return (

  <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getAllNotes }}>

    {props.children}

  </noteContext.Provider>

)
}

export default NoteState