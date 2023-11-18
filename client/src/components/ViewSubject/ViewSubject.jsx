import React, { useState, useEffect } from "react";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./ViewSubjectStyle.css";

export const ViewSubject = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3001/subjects");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error.message);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="view-subject-container">
      <div className="viw-subject-elements">
        <div className="home-page-hamburger">
          <Link to="/menu">
            <RiMenuFill className="home-page-rimenufill" />
          </Link>
        </div>

        <h1 className="view-subject-h1">PRZEDMIOTY</h1>

<div className="table-div-container">
        <table className="subject-table table-subject-table-td">
          <thead>
            <tr>
              <th className="table-subject-table-td">Lp.</th>
              <th className="table-subject-table-td">Przedmiot</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject._id} className="subject-row">
                <td className="table-subject-table-td">{index + 1}</td>
                <td className="table-subject-table-td">{subject.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};