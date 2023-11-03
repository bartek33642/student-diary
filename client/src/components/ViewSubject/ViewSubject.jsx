import React from "react"
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./ViewSubjectStyle.css"; 

export const ViewSubject = () => {
    return(
        <div className="view-subject-container">
            <div className="viw-subject-elements">
            <div className="home-page-hamburger">
                    <Link to="/menu"><RiMenuFill className="home-page-rimenufill"/></Link>
                </div>

                <h1 className="view-subject-h1">
                    PRZEDMIOTY
                </h1>

                


            </div>
        </div>
    );
}