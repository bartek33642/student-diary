import React from "react"
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./SettingsStyle.css"; 

export const Settings = () => {
    return(
        <div className="settings-container">
            <div className="settings-elements">
            <div className="home-page-hamburger">
                    <Link to="/menu"><RiMenuFill className="home-page-rimenufill"/></Link>
                </div>

                <h1 className="settings-h1">
                    Ustawienia
                </h1>

                


            </div>
        </div>
    );
}