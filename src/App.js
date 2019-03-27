import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';
import Notepad from './Notepad';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      notePad: [],
      noteCategory: "Personal",
      noteTitle: "",
      noteContent: "",
      editMode: false,
      noteIdToEdit: "",
      user: null
    }
  }

  componentDidMount() {

    const dbRef = firebase.database().ref('notes');
    dbRef.on('value', snapshot => {

      const data = snapshot.val()
      const updateNotePad = []

      for (let note in data) {
        updateNotePad.push({
          id: note,
          noteCategory: data[note].noteCategory,
          noteTitle: data[note].noteTitle,
          noteContent: data[note].noteContent
        })
      }

      this.setState({
        notePad: updateNotePad
      })
    })

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
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
    alert('Entering edit mode - please make edits in the form');

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

    this.setState({
      noteContent: "",
      noteTitle: "",
      noteCategory: "Personal",
      noteIdToEdit: "",
      editMode: false
    })
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Header 
          user = {this.state.user}
          login = {this.login}
          logout = {this.logout}
        />
        <section className="inputs" id="main">
          <Form 
            handleSubmit = {this.handleSubmit}
            handleChange = {this.handleChange}
            handleEditSubmit = {this.handleEditSubmit}
            noteCategory = {this.state.noteCategory}
            noteTitle = {this.state.noteTitle}
            noteContent = {this.state.noteContent}
            editMode = {this.state.editMode}
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
