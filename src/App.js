import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './Header';
import Footer from './Footer';

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
      editMode: false,
      noteIdToEdit: ""
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

    const dbRef = firebase.database().ref('notes')

    dbRef.push({
      noteTitle: this.state.noteTitle,
      noteContent: this.state.noteContent,
      noteCategory: this.state.noteCategory
    })
  
    this.setState({
      noteContent: "", //resets after each submission
      noteTitle: "",
      noteCategory: "Personal",
      noteIdToEdit: ""
    })
  }

  handleChange = (e) => {
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteNote = (noteId) => {
    const dbRef = firebase.database().ref('notes')
    const noteToDelete = dbRef.child(noteId)
    noteToDelete.remove();
  }

  editNote = (currentNoteCategory, currentNoteTitle, currentNoteContent, currentNoteId) => {
    alert('Please make necessary edits in the form');

    this.setState({
      noteCategory: currentNoteCategory,
      noteTitle: currentNoteTitle,
      noteContent: currentNoteContent,
      editMode: true,
      noteIdToEdit: currentNoteId
    })
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref('notes')
    const noteToEdit = dbRef.child(this.state.noteIdToEdit)

    noteToEdit.set({
      noteCategory: this.state.noteCategory,
      noteTitle: this.state.noteTitle,
      noteContent: this.state.noteContent
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className="inputs" id="top">
          <form action="submit" onSubmit={this.handleSubmit}>

            {/* CATEGORY DROPDOWN */}
            <div className="inputsSection">
              <label htmlFor="noteCategory" className="visuallyHidden">Pick a category:</label>
                <select name="noteCategory" id="noteCategory" value={this.state.noteCategory} onChange={this.handleChange} required>
                  <option value="Personal" defaultValue>Personal</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              
              {/* NOTE TITLE INPUT */}
              <label htmlFor="noteTitle" className="visuallyHidden">Give your note a title:</label>
                <input 
                  type="text" 
                  id="noteTitle" 
                  placeholder="Note title..." 
                  name="noteTitle" 
                  onChange={this.handleChange} 
                  value={this.state.noteTitle}
                  required
                />
            </div>
          
            {/* NOTE CONTENT INPUT */}
            <label htmlFor="noteContent" className="visuallyHidden">Type your note</label>
              <textarea 
                name="noteContent" 
                id="noteContent" 
                placeholder="Write your note..." 
                cols="40" 
                rows="7" 
                onChange={this.handleChange}
                value={this.state.noteContent}
                required>
              </textarea>
            
            <button type="submit">Note-It!</button>
            <button onClick={this.handleEditSubmit}>
              Submit Edit</button>

          </form>
        </section>

        <main className="wrapper">
          {
            this.state.notePad.map((note) => {
              return (
                <div className={note.noteCategory} tabindex="0" key={note.id}>
                  <h2>{note.noteTitle}</h2>
                  <p>{note.noteContent}</p>
                  <a href="#top">
                    <button className="edit"
                      onClick={() => this.editNote(note.noteCategory, note.noteTitle, note.noteContent, note.id)}>
                      &#9998;
                    </button>
                  </a>
                  <button className="delete" onClick={() => this.deleteNote(note.id)}>&times;</button>
                </div>
              )
            })
          }
        </main>
        <Footer />
      </div>
    );
  }
}



export default App;
