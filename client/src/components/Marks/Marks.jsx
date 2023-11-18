import React, { useEffect, useState } from "react";
import "./MarksStyle.css"
import { TableMarks } from "./TableMarks/TableMarks";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CalculatorOfAverage } from "./CalculatorOfAverage/CalculatorOfAverage";
import { fullYearAverage } from "../../functionality/fullYearAverage";

export const Marks = () => {
    const [finalGrades, setFinalGrades] = useState({}); // Ustawienie stanu dla ocen końcowych

    useEffect(() => {
        const fetchData = async () => {
          try {
            const finalGradesEndpoint = 'http://localhost:3001/finalGrades/all';
            const response = await fetch(finalGradesEndpoint);
            const data = await response.json();
            setFinalGrades(data);
          } catch (error) {
            console.error('Błąd podczas pobierania danych:', error.message);
          }
        };
    
        fetchData();
      }, []);


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
                    Twoja średnia z całego roku : {fullYearAverage(finalGrades)}<br />
                    Świadectwo z paskiem: 
                </h2>
                </div>

                <hr className="marks-hr"/>

                <div className="elements-marks-view">
                    <h2 className="marks-h2">
                    Sprawdź, jaka wychodzi Ci średnia ważona - <br />
                    Kalkulator średniej
                    </h2>
                    <CalculatorOfAverage />
                </div>
            </div>
        </div>
    );
}

