import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './header';
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
// import { faCoffee } from '@fontawesome/free-solid-svg-icons'

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      notePad: [],
      noteCategory: "Personal",
      noteTitle: "",
      noteContent: "",
      editMode: false
    }
  }

  componentDidMount() {

    const dbRef = firebase.database().ref('notes');
    dbRef.on('value', snapshot => {

      const data = snapshot.val()
      const updateNotePad = []

      console.log(data);

      for (let note in data) {
        updateNotePad.push({
          id: note,
          noteCategory: data[note].noteCategory,
          noteTitle: data[note].noteTitle,
          noteContent: data[note].noteContent
        })
        console.log(updateNotePad)
      }

      this.setState({
        notePad: updateNotePad
      })
    })
  }

  //FUNCTIONS

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state.noteContent)

    const dbRef = firebase.database().ref('notes')

    dbRef.push({
      noteTitle: this.state.noteTitle,
      noteContent: this.state.noteContent,
      noteCategory: this.state.noteCategory
    })
  
    this.setState({
      noteContent: "", //reset userNote after each submission
      noteTitle: "",
      noteCategory: ""
    })
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteNote = (noteId) => {
    const dbRef = firebase.database().ref('notes')
    const noteToDelete = dbRef.child(noteId)
    console.log(noteToDelete)
    noteToDelete.remove();
  }

  editNote = (noteId, currentNoteCategory, currentNoteTitle, currentNoteContent) => {
    alert('Please make necessary edits in the form');
    const dbRef = firebase.database().ref('notes')
    const noteToEdit = dbRef.child(noteId)
    this.setState({
      noteCategory: currentNoteCategory,
      noteTitle: currentNoteTitle,
      noteContent: currentNoteContent,
      editMode: true
    })
    noteToEdit.set({
      noteCategory: this.state.noteCategory,
      noteTitle: this.state.noteTitle,
      noteContent: this.state.noteContent
    });
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
  }

  // create a state called edit mode and use true/false conditional rendering
  // hide Post button, show Edit button that runs new function

  render() {
    return (
      <div className="App">
        <Header />
        <section className="inputs">
          <form action="submit" onSubmit={this.handleSubmit}>

            {/* CATEGORY DROPDOWN */}
            <label htmlFor="noteCategory">Category:
              <select name="noteCategory" id="noteCategory" value={this.state.noteCategory} onChange={this.handleChange} required>
                <option value="Personal" defaultValue>Personal</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </label>

            {/* NOTE TITLE INPUT */}
            <label htmlFor="noteTitle">Note title:
              <input 
                type="text" 
                id="noteTitle" 
                placeholder="Note title..." 
                name="noteTitle" 
                onChange={this.handleChange} 
                value={this.state.noteTitle}
                required
              />
            </label>

            {/* NOTE CONTENT INPUT */}
            <label htmlFor="noteContent">
              <textarea 
                name="noteContent" 
                id="noteContent" 
                placeholder="Write your note..." 
                cols="40" 
                rows="10" 
                onChange={this.handleChange}
                value={this.state.noteContent}
                required>
              </textarea>
            </label>

            <button type="submit">Post Your Note!</button>
            <button type="submit"
              onClick={() => this.handleEditSubmit}>
              Submit edit</button>

          </form>
        </section>

        <main className="wrapper">
          {
            this.state.notePad.map((note) => {
              return (
                <div className={note.noteCategory} key={note.id}>
                  <h2>{note.noteTitle}</h2>
                  <p>{note.noteContent}</p>
                  <button className="delete" onClick={() => this.deleteNote(note.id)}>&times;</button>
                  <button className="edit" 
                    onClick={() => this.editNote(note.id, note.noteCategory, note.noteTitle, note.noteContent)}>
                    &#9998;</button>
                </div>
              )
            })
          }
        </main>
      </div>
    );
  }
}



export default App;
