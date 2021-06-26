import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'header--black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png" alt="netflix-logo"/>
                </a>
            </div>
            <div className="header--user">
                <a>
                    <img src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg" alt="user-image" />
                </a>
            </div>
        </header>
    )
}