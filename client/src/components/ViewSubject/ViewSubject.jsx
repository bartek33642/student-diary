import React, { useState, useEffect } from "react";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./ViewSubjectStyle.css";

export const ViewSubject = () => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/subjects");
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleRenameSubject = async (subjectId) => {
    const newName = window.prompt('Podaj nową nazwę przedmiotu:');

    if (newName !== null && newName.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:3001/subjects/${subjectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newName,
          }),
        });

        if (response.ok) {
          console.log(`Zaktualizowano nazwę przedmiotu o ID ${subjectId}`);
          // Pobierz zaktualizowaną listę przedmiotów po aktualizacji
          fetchSubjects();
        } else {
          console.error('Błąd podczas aktualizacji nazwy przedmiotu:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };

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
                <th className="table-subject-table-td">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={subject._id} className="subject-row">
                  <td className="table-subject-table-td">{index + 1}</td>
                  <td className="table-subject-table-td">{subject.name}</td>
                  <td className="table-subject-table-td">
                    <button className="button-change-name-of-subject" onClick={() => handleRenameSubject(subject._id)}>Zmień nazwę</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
