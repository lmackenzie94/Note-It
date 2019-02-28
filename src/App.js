import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './header';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      notePad: [],
      noteCategory: "Personal",
      noteTitle: "Initial title",
      noteContent: "Initial content"
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
          noteTitle: note,
          noteContent: data[note]
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
    dbRef.push(this.state.noteTitle)
    dbRef.push(this.state.noteContent)
  
    this.setState({
      noteContent: "" //reset userNote after each submission
    })
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <div className="App">
        <Header />

        <section className="inputs">
          <h2>New note:</h2>
            <form action="submit" onSubmit={this.handleSubmit}>

              {/* CATEGORY DROPDOWN */}
              <label htmlFor="noteCategory">Category:
                <select name="noteCategory" id="noteCategory" onChange={this.handleChange}>
                  <option value="Personal" defaultValue>Personal</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              {/* NOTE TITLE INPUT */}
              <label htmlFor="noteTitle">Note title:
                <input type="text" id="noteTitle" placeholder="Note title..." name="noteTitle" onChange={this.handleChange}/>
              </label>

              {/* NOTE CONTENT INPUT */}
              <label htmlFor="noteContent">
                <textarea name="noteContent" id="noteContent" cols="30" rows="10" placeholder="Write your note..." onChange={this.handleChange}></textarea>
              </label>

              <button type="submit">Post Your Note!</button>

            </form>
        </section>

        <main className="wrapper">
          {
            this.state.notePad.map((note, i) => {
              return (
                <div className="singleNote" key={note.noteTitle}>
                  <h2>{note.noteTitle}</h2>
                  <p>{note.noteContent}</p>
                  <span className="delete">&times;</span>
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
