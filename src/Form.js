import React from 'react';

const Form = (props) => {
    return (
        <form action="submit" onSubmit={props.handleSubmit}>

            {/* CATEGORY DROPDOWN */}
            <div className="inputsSection">
                <label htmlFor="noteCategory" className="visuallyHidden">Pick a category:</label>
                <select name="noteCategory" id="noteCategory" value={props.noteCategory} onChange={props.handleChange} required>
                    <option value="Personal" defaultValue>Personal</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                </select>

                {/* NOTE TITLE INPUT */}
                <label htmlFor="noteTitle" className="visuallyHidden">Give your note a title:</label>
                <input
                    type="text"
                    id="noteTitle"
                    placeholder="Enter note title..."
                    name="noteTitle"
                    onChange={props.handleChange}
                    value={props.noteTitle}
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
                onChange={props.handleChange}
                value={props.noteContent}
                required>
            </textarea>

            <button type="submit">Note-It!</button>
            <button onClick={props.handleEditSubmit}>
                Submit Edit</button>

        </form>
    )
}

export default Form;