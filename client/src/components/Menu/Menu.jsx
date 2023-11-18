import React from 'react';
import { Link } from "react-router-dom";
import "./MenuStyle.css";
import { RiCloseFill } from "react-icons/ri";

export const Menu = () => {
 


    return (
        <div className="menu-container">

            <div className="menu-close-div">
                <RiCloseFill className="menu-riclosefill"/>
            </div>

            <ul className="menu-ul-style">
                <Link to="/" className="menu-link-style"><li className="menu-li-style">Strona główna</li></Link>
                <Link to="/marks" className="menu-link-style"><li className="menu-li-style">Oceny</li></Link>
                <Link to="/viewsubject" className="menu-link-style"><li className="menu-li-style">Przedmioty</li></Link>
                <Link to="/settings" className="menu-link-style"><li className="menu-li-style">O aplikacji</li></Link>
            </ul>

        </div>
    );
};