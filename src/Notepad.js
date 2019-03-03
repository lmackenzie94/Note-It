import React from 'react';

const Notepad = (props) => {
    return (
        props.notePad.map((note) => {
            return (
                <div className={note.noteCategory} tabindex="0" key={note.id}>
                    <h2>{note.noteTitle}</h2>
                    <p>{note.noteContent}</p>
                    <a href="#top">
                        <button className="edit"
                            onClick={() => props.editNote(note.noteCategory, note.noteTitle, note.noteContent, note.id)}>
                            &#9998;
                    </button>
                    </a>
                    <button className="delete" onClick={() => props.deleteNote(note.id)}>X</button>
                </div>
            )
        })
    )
}

export default Notepad;