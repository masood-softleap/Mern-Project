import React,{useContext} from 'react'
import noteContext from '../context/Notes/noteContext';
const NoteItem = (props) => {
    const context=useContext(noteContext)
    const {deleteNote}=context;
    const { note,updateNote } = props;
    return (
        <>
            <div className="card col-md-3 m-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>

        </>
    )
}

export default NoteItem
