import React, { useEffect, useState } from "react";
import "./TableMarksStyle.css";
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';
import { countArithmeticAverage } from '../../../functionality/countArithmeticAverage'
import { countWeightedAverage } from "../../../functionality/countWeightedAverage";
import { median } from "../../../functionality/median";
import { calculateExpectedGrade } from "../../../functionality/expectedGrade";
import { fullYearAverage } from "../../../functionality/fullYearAverage";
import { isCertificateWithHonors } from "../../../functionality/isCertificateWithHonors";
import { Tooltip as TippyTooltip } from 'react-tippy';


export const TableMarks = () => {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [finalGrades, setFinalGrades] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  const fetchData = async () => {
    try {
      const gradesEndpoint = 'http://localhost:3001/grades/all';
      const subjectsEndpoint = 'http://localhost:3001/subjects';

      const { grades, subjects } = await forkJoin({
        grades: ajax.getJSON(gradesEndpoint),
        subjects: ajax.getJSON(subjectsEndpoint),
      }).toPromise();

      const mergedData = grades.map((grade) => {
        const subject = subjects.find((sub) => sub._id === grade.subjectId);
        return { ...grade, subjectName: subject ? subject.name : '' };
      });

      setGrades(mergedData);
      setSubjects(subjects);

      const finalGradesEndpoint = 'http://localhost:3001/finalGrades/';
      const finalGradesPromises = mergedData.map((grade) =>
        ajax.getJSON(`${finalGradesEndpoint}${grade.subjectId}`)
      );

      const finalGradesData = await forkJoin(finalGradesPromises).toPromise();

      const finalGradesMap = finalGradesData.reduce((acc, data, index) => {
        const subjectName = mergedData[index].subjectName;
        acc[subjectName] = data;
        return acc;
      }, {});

      setFinalGrades(finalGradesMap);

      setIsLoading(false);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const groupGradesBySubject = (grades) => {
    const groupedGrades = {};

    subjects.forEach((subject) => {
      groupedGrades[subject.name] = [];
    });

    grades.forEach((grade) => {
      groupedGrades[grade.subjectName].push(grade.value);
    });

    console.log('groupedGrades:', groupedGrades);

    return groupedGrades;
  };

  const handleAddGradeClick = async (subjectId) => {
    const newGrade = window.prompt('Wprowadź nową ocenę:');
    const newWeight = window.prompt('Wprowadź wagę oceny:');
    const newComment = window.prompt('Wprowadź komentarz:');

    console.log('New Grade:', newGrade);
    console.log('New Weight:', newWeight);
    console.log('New Comment:', newComment);
    console.log('Subject ID:', subjectId);

    if (newGrade !== null && newWeight !== null && newComment !== null) {
      try {
        const subject = subjects.find((sub) => sub.name === subjectId);

        if (!subject) {
          console.error('Przedmiot o nazwie', subjectId, 'nie został znaleziony.');
          return;
        }

        const addGradeEndpoint = `http://localhost:3001/grades`;
        const response = await fetch(addGradeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: parseFloat(newGrade),
            weight: parseFloat(newWeight),
            comment: newComment,
            subjectId: subject._id,
          }),
        });

        if (response.ok) {
          console.log('Nowa ocena została dodana.');
          fetchData();
        } else {
          console.error('Błąd podczas dodawania nowej oceny:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };

  const handleAddFinalGradeClick = async (subjectId) => {
    const newFinalGrade = window.prompt('Wprowadź nową ocenę końcową:');
    console.log('New Final Grade:', newFinalGrade);

    if (newFinalGrade !== null) {
      try {
        const subject = subjects.find((sub) => sub.name === subjectId);

        const addFinalGradeEndpoint = `http://localhost:3001/finalGrades`;
        const response = await fetch(addFinalGradeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: parseFloat(newFinalGrade),
            subjectId: subject._id,
          }),
        });

        if (response.ok) {
          console.log('Nowa ocena końcowa została dodana.');
          fetchData();
        } else {
          console.error('Błąd podczas dodawania nowej oceny końcowej:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };

  console.log('grades:', grades);

  const handleGradeClick = async (subjectId, gradeId) => {
    const newWeight = window.prompt('Wprowadź wagę oceny:');
    const newComment = window.prompt('Wprowadź komentarz:');
  
    console.log('New Weight:', newWeight);
    console.log('New Comment:', newComment);
    console.log('Subject ID:', subjectId);
    console.log('Grade ID:', gradeId);
  
    if (newWeight !== null && newComment !== null) {
      try {
        const subject = subjects.find((sub) => sub.name === subjectId);
  
        if (!subject) {
          console.error('Przedmiot o nazwie', subjectId, 'nie został znaleziony.');
          return;
        }
        
        const grade = grades.find((g) => g._id === gradeId);

        if (!grade) {
          console.error('Ocena o identyfikatorze', gradeId, 'nie została znaleziona.');
          return;
        }
  
        const addGradeEndpoint = `http://localhost:3001/grades`;
        const response = await fetch(addGradeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: parseFloat(grade.value),
            weight: parseFloat(newWeight),
            comment: newComment,
            subjectId: subject._id,
          }),
        });
  
        if (response.ok) {
          console.log('Nowa ocena została dodana.');
          fetchData();
        } else {
          console.error('Błąd podczas dodawania nowej oceny:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };
  

  if (isLoading || grades.length === 0 || Object.keys(finalGrades).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="marks-table">
      <table className="table-of-grades">
        <thead>
          <tr className="marks-table-tr">
            <th className="marks-table-th">Przedmiot</th>
            <th className="marks-table-th">Oceny</th>
            <th className="marks-table-th">Średnia <br />arytmetyczna</th>
            <th className="marks-table-th">Średnia <br />ważona</th>
            <th className="marks-table-th">Mediana</th>
            <th className="marks-table-th">Przewidywana ocena <br />końcowa</th>
            <th className="marks-table-th">Ocena <br /> końcowa</th>
          </tr>
        </thead>
        <tbody>
        {grades && grades.length > 0 && Object.entries(groupGradesBySubject(grades)).map(([subject, values]) => {
            return (
              <tr key={subject} className="marks-table-tr">
                <td className="marks-table-td">{subject}</td>
                {values.map((grade, index) => {
                  const gradeInfo = grades.find(g => g.subjectName === subject && g.value === grade);
                  return (
                    <TippyTooltip
                      key={index}
                      title={`Waga: ${gradeInfo?.weight}, Ocena: ${grade}, Komentarz: ${gradeInfo?.comment}`}
                      position="top"
                      trigger="mouseenter"
                    >
                      <button
                        className="grade-button"
                        // onClick={() => handleGradeClick(subject, grade)}
                      >
                        {grade}
                      </button>
                    </TippyTooltip>
                  );
                })}
                <button className="grade-button-2" onClick={() => handleAddGradeClick(subject)}>+</button>


                <td className="marks-table-td">{countArithmeticAverage(values)}</td>
                <td className="marks-table-td">{countWeightedAverage(values, grades, subject)}</td>
                <td className="marks-table-td">{median(values)}</td>
                <td className="marks-table-td">{calculateExpectedGrade(countWeightedAverage(values, grades, subject))}</td>
                <td className="marks-table-td">
                  {finalGrades[subject] && finalGrades[subject][0] && finalGrades[subject][0].value}
                  <button className="grade-button-2" onClick={() => handleAddFinalGradeClick(subject)}>+</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr className="marks-hr table-marks-hr" />

      <div className="elements-marks-view">
        <h2 className="marks-h2">
          Twoja średnia z całego roku: {fullYearAverage(finalGrades)}
          <br />
          Świadectwo z paskiem: {isCertificateWithHonors(fullYearAverage)}
        </h2>
      </div>
    </div>
  );
};
