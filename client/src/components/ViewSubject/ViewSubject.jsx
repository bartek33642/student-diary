import React, { useState, useEffect } from "react";
import { RiMenuFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./ViewSubjectStyle.css";
import sortingSubjects from "../../functionality/sortingSubjects";
import changeColorTable from "../../functionality/changeColorTable";

export const ViewSubject = ({ grades }) => {
  const [subjects, setSubjects] = useState([]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:3001/subjects");
      const data = await response.json();
      const sortedSubjects = sortingSubjects(data);
      setSubjects(sortedSubjects);    } catch (error) {
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
  const handleDeleteSubject = async (subjectId) => {
    const shouldDelete = window.confirm('Czy na pewno chcesz usunąć ten przedmiot? Upewnij się, że nie ma wpisanej żadnej oceny przypisanej do tego przedmiotu!');
  
    if (shouldDelete) {
      try {
        // 'grades' is not defined here
        // You need to define or pass 'grades' as a prop to this component
        const response = await fetch(`http://localhost:3001/subjects/${subjectId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log(`Przedmiot o ID ${subjectId} został usunięty.`);
          fetchSubjects(); // Refresh the list of subjects after deletion
        } else {
          console.error('Błąd podczas usuwania przedmiotu:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };
  
  const handleColorChange = (subjectId, color) => {
    // Aktualizuj kolor wiersza tabeli lokalnie
    const updatedSubjects = subjects.map(subject =>
      subject._id === subjectId ? { ...subject, color } : subject
    );
    setSubjects(updatedSubjects);

    // Aktualizuj kolor w localStorage
    changeColorTable(subjectId, color);
  };
  
  const areSubjectsEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]._id !== arr2[i]._id || arr1[i].color !== arr2[i].color) {
        return false;
      }
    }
    return true;
  };
  
  useEffect(() => {
    // Pobierz kolor z localStorage i zaktualizuj stany przedmiotów
    const updatedSubjects = subjects.map(subject => {
      const storedColor = localStorage.getItem(`subjectColor_${subject._id}`);
      return storedColor ? { ...subject, color: storedColor } : subject;
    });
  
    // Sprawdź, czy stan faktycznie się zmienił przed aktualizacją
    if (!areSubjectsEqual(updatedSubjects, subjects)) {
      setSubjects(updatedSubjects);
    }
  }, [subjects]);


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
                <tr key={subject._id} className="subject-row" style={{ backgroundColor: subject.color }}> 
                  <td className="table-subject-table-td">{index + 1}</td>
                  <td className="table-subject-table-td">{subject.name}</td>
                  <td className="table-subject-table-td">
                    <button className="button-change-name-of-subject" onClick={() => handleRenameSubject(subject._id)}>Zmień nazwę</button>
                    <button className="button-delete-subject" onClick={() => handleDeleteSubject(subject._id)}>Usuń</button>
                    <input
                    type="color"
                    className="button-change-color"
                    name="change_color"
                    value={subject.color} // Przypisanie wartości koloru z aktualnego stanu
                    onChange={(e) => handleColorChange(subject._id, e.target.value)}
                  />     
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

