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
                    O aplikacji
                </h1>

        <div className="information-about-app">
            <h5>
                <p>Aplikacja ta jest projektem zrealizowanym w ramach przedmiotu Testowanie i jakość oprogramowania.</p>
                <p>Jest to dzienniczek elektroniczny dla uczniów.</p>
                <p>Umożliwia dodawanie przedmiotów, ocen oraz sprawdzanie średnich dla ucznia.</p>
                <p>Wersja aplikacji: 1.0</p>
            </h5>
            </div>
                


            </div>
        </div>
    );
}