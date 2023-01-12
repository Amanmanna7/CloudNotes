import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

  const host = "http://localhost:5000";

  const notesInit = [
  ]
  const [notes, setNotes] = useState(notesInit)


  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fecthallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO : API call
    tag=tag===""?'default':tag;
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag})
    });
    const json = await response.json();
    // console.log(json);

    // console.log("Adding a note")
    // const note = {
    //   "_id": "9",
    //   "user": "638edf0ed5bUdfjkasd13434sdf",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-12-07T13:18:46.205Z",
    //   "__v": 0
    // };
    // setNotes(notes.concat(note))
    setNotes(notes.concat(json))
  }

  //Delete a Note
  const deleteNote = async (id,showAlert) => {
    //TODO : API call

    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // const json = await response.json();

    // console.log(json.note);

    // console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => id !== note._id);
    setNotes(newNotes);
    showAlert("Deleted Successfully","success");
  }
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //TODO : API call

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = await response.json();
    // console.log(json);

    //Logic to edit in client
    let newNote=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      if (newNote[index]._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;