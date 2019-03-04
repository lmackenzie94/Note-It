import React from 'react';

const Notepad = (props) => {
    if (props.notePad.length === 0) {
        return (
            <p className="noNotesMessage">You currently have no notes.</p>
        )
    }
    return (
        props.notePad.map((note) => {
            return (
                <div className={note.noteCategory} tabIndex="0" key={note.id}>
                    <h2>{note.noteTitle}</h2>
                    <p>{note.noteContent}</p>
                    <a href="#main">
                        <button className="edit" tabIndex="0" title="Edit note" onClick={() => props.editNote(note.noteCategory, note.noteTitle, note.noteContent, note.id)}>&#9998;</button>
                    </a>
                    <button className="delete" tabIndex="0" title="Delete note" onClick={() => props.deleteNote(note.id)}>&times;</button>
                </div>
            )
        })
    )
}

export default Notepad;