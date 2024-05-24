import React,{useContext,useState} from 'react'
import noteContext from '../context/Notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useEffect,useRef} from 'react';
import { useNavigate } from "react-router-dom";

const Notes = () => {
    
    const context=useContext(noteContext)
    const{notes,getAllNotes,editNote}=context;
    let navigate = useNavigate();
useEffect(()=>{
  if(localStorage.getItem('token')){
    getAllNotes();
    
  }else{navigate('/login')}
},[])
const ref=useRef(null)
const refClose=useRef(null)

const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})

const updateNote=(currentNote)=>{
ref.current.click();
setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

}


const handleOnClick=(e)=>{
  console.log("updating",note)
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click();
}
const onChange=(e)=>{
setNote({...note,[e.target.name]:e.target.value})
}
  return (
  <>
  
  <Addnote></Addnote>


  <button type="button"  ref={ref} className=" d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={onChange} aria-describedby="emailHelp"/>
    </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription'  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" value={note.etag} name='etag'  onChange={onChange}/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleOnClick} className="btn btn-primary">Update Notes</button>
      </div>
    </div>
  </div>
</div>

   <div className='row'>

   <h2>Your Notes</h2>
  <div className='container'>
   {notes.length===0 && "no notes to diplay"}
  </div>
    {notes.map((note)=>{
        return <NoteItem key={note._id}note={note} updateNote={updateNote}></NoteItem>;
    })}
    </div>
  </>
  )
}

export default Notes
