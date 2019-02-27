import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Header from './header';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      notePad: []
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
        // console.log(updateNotePad)
      }

      this.setState({
        notePad: updateNotePad
      })
    })

  }


  render() {
    return (
      <div className="App">
        <Header />
        <main className="wrapper">
          {
            this.state.notePad.map((note, i) => {
              return (
                <div className="singleNote" key={i}>
                  <h2>{note.noteTitle}</h2>
                  <p>{note.noteContent}</p>
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
