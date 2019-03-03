import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';
import Notepad from './Notepad';

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
          <Form 
            handleSubmit = {this.handleSubmit}
            handleChange = {this.handleChange}
            handleEditSubmit = {this.handleEditSubmit}
            noteCategory = {this.state.noteCategory}
            noteTitle = {this.state.noteTitle}
            noteContent = {this.state.noteContent}
          />
        </section>

        <main className="wrapper">
          {
            <Notepad 
              notePad = {this.state.notePad}
              editNote = {this.editNote}
              deleteNote = {this.deleteNote}
            />
          }
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
