import React from "react";
import "./MarksStyle.css"
import { TableMarks } from "./TableMarks/TableMarks";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";


export const Marks = () => {
    return(
        <div className="marks-container">
            <div className="marks-elements">
            <div className="home-page-hamburger">
                    <Link to="/menu"><RiMenuFill className="home-page-rimenufill"/></Link>
                </div>
                <div className="elements-marks-view">
                <TableMarks />
                </div>
                <hr className="marks-hr"/>
                
                <div className="elements-marks-view">
                <h2 className="marks-h2">
                    Twoja średnia z całego roku :     <br />
                    Świadectwo z paskiem: 
                </h2>
                </div>

                <hr className="marks-hr"/>

                <div className="elements-marks-view">
                    <h2 className="marks-h2">
                    Sprawdź, jaka wychodzi Ci średnia ważona - <br />
                    Kalkulator średniej
                    </h2>
                </div>
            </div>
        </div>
    );
}

