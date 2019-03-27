import React from 'react';

const Header = (props) => {
    return (
        <header className="header">
            <h1 className="headerTitle">Note-It</h1>
            {props.user ? <button onClick={props.logout}>Log Out</button> : <button onClick={props.login}>Log In</button>}
        </header>
    )
}

export default Header;