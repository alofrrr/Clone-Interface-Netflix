/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" alt="Netflix"></img>
                </a>
            </div>
            <div className="header--user">
                
            <a href="/">
                    <img src="https://avatars.githubusercontent.com/u/80932554?v=4" alt="Nalaura"></img>
                </a>
   
            </div>
        </header>
    );
}