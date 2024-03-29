import React, { useEffect, useState } from "react";
import "./TableMarksStyle.css";
import { ajax } from 'rxjs/ajax';
import { forkJoin } from 'rxjs';
import countArithmeticAverage from '../../../functionality/countArithmeticAverage'
import countWeightedAverage from "../../../functionality/countWeightedAverage";
import median  from "../../../functionality/median";
import calculateExpectedGrade from "../../../functionality/expectedGrade";
import fullYearAverage from "../../../functionality/fullYearAverage";
import isCertificateWithHonors from "../../../functionality/isCertificateWithHonors";
import { Tooltip as TippyTooltip } from 'react-tippy';
import mode from "../../../functionality/mode";
import gradesColors from "../../../functionality/gradesColors";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ViewSubject } from "../../ViewSubject/ViewSubject";
import uppercaseFirstLetterOfSubject from "../../../functionality/uppercaseFirstLetterOfSubject";
import '../../../../node_modules/react-vis/dist/style.css';
import RadialChartComponent from "./RadialChart";
import BarChartComponent from "./BarChart";
import LineChartComponent from "./LineChart";
import percentageNumberOfMarks from "../../../functionality/percentageNumberOfMarks";

export const TableMarks = () => {

  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [finalGrades, setFinalGrades] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState(null); // Dodaj nowy stan do przechowywania informacji o wybranej ocenie
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isChartsVisible, setIsChartsVisible] = useState(false);

  const [selectedGradeForPercentage, setSelectedGradeForPercentage] = useState(null);
  const [percentageResult, setPercentageResult] = useState(null);


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
    console.log('Final Grades Data:', finalGradesData);

    const finalGradesMap = finalGradesData.reduce((acc, data, index) => {
      const subjectName = mergedData[index].subjectName;
      acc[subjectName] = data;
      return acc;
    }, {});
    console.log('Final Grades Map:', finalGradesMap);

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
      groupedGrades[subject._id] = [];
    });
  
    grades.forEach((grade) => {
      groupedGrades[grade.subjectId].push(grade._id);
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
        const subject = subjects.find((sub) => sub._id === subjectId);

        if (!subject) {
          console.error('Przedmiot o id', subjectId, 'nie został znaleziony.');
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

  const getFinalGradesForSubject = (finalGrades, subjectName) => {
    if (finalGrades.hasOwnProperty(subjectName)) {
      return finalGrades[subjectName].map(finalGrade => finalGrade.value);
    } else {
      return [];
    }
  };
  
  const handleAddFinalGradeClick = async (subjectId) => {
    const newFinalGrade = window.prompt('Wprowadź nową ocenę końcową:');
    console.log('New Final Grade:', newFinalGrade);
  
    if (newFinalGrade !== null) {
      try {
        const subject = subjects.find((sub) => sub._id === subjectId);
  
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
  
  const handleDeleteFinalGradeClick = async (subjectId) => {
    const subjectName = subjects.find(sub => sub._id === subjectId)?.name || '';
    const finalGradesForSubject = finalGrades[subjectName] || [];
    
    const finalGradeId = finalGradesForSubject.length > 0 ? finalGradesForSubject[0]._id : null;
    console.log('Final Grade Id to delete:', finalGradeId);
  
    const shouldDelete = window.confirm('Czy na pewno chcesz usunąć ocenę końcową?');
  
    if (shouldDelete) {
      try {
        const deleteFinalGradeEndpoint = `http://localhost:3001/finalGrades/${finalGradeId}`;
        const response = await fetch(deleteFinalGradeEndpoint, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Ocena końcowa została usunięta.');
          fetchData(); // ponowne pobranie danych po usunięciu
        } else {
          console.error('Błąd podczas usuwania oceny końcowej:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };

  const handleGradeEditClick = async (subjectId, gradeId) => {
    const newValue = window.prompt('Wprowadź nową ocenę:');
    const newWeight = window.prompt('Wprowadź nową wagę oceny:');
    const newComment = window.prompt('Wprowadź nowy komentarz:');
  
    if (newWeight !== null && newComment !== null && newValue !== null) {
      try {
        const subject = subjects.find((sub) => sub._id === subjectId);
        const grade = grades.find((g) => g._id === gradeId);
  
        if (!subject || !grade) {
          console.error('Nie znaleziono przedmiotu lub oceny.');
          return;
        }
  
        const updateGradeEndpoint = `http://localhost:3001/grades/${gradeId}`;
        const response = await fetch(updateGradeEndpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            value: parseFloat(newValue),
            weight: parseFloat(newWeight),
            comment: newComment,
            subjectId: subject._id,
          }),
        });
  
        if (response.ok) {
          console.log('Ocena zaktualizowana pomyślnie.');
          fetchData();
        } else {
          console.error('Błąd podczas aktualizacji oceny:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };
  
  const handleGradeDeleteClick = async (subjectId, gradeId) => {
    const shouldDelete = window.confirm('Czy na pewno chcesz usunąć tę ocenę?');
  
    if (shouldDelete) {
      try {
        const deleteGradeEndpoint = `http://localhost:3001/grades/${gradeId}`;
        const response = await fetch(deleteGradeEndpoint, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          console.log('Ocena usunięta pomyślnie.');
          fetchData();
        } else {
          console.error('Błąd podczas usuwania oceny:', response.statusText);
        }
      } catch (error) {
        console.error('Błąd podczas komunikacji z serwerem:', error.message);
      }
    }
  };
  

  
  const handleGradeClick = async (subjectId, gradeId) => {
    const newWeight = window.prompt('Wprowadź wagę oceny:');
    const newComment = window.prompt('Wprowadź komentarz:');

    console.log('New Weight:', newWeight);
    console.log('New Comment:', newComment);
    console.log('Subject ID:', subjectId);
    console.log('Grade ID:', gradeId);

    if (newWeight !== null && newComment !== null) {
      try {
        const subject = subjects.find((sub) => sub._id === subjectId);

        if (!subject) {
          console.error('Przedmiot o id', subjectId, 'nie został znaleziony.');
          return;
        }
        
        const grade = grades.find((g) => g._id === gradeId);

        if (!grade) {
          console.error('Ocena o id', gradeId, 'nie została znaleziona.');
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

  const handleModeClick = (subjectId, grades) => {
    const gradesMode = mode(grades);
    alert(`Dominanta ocen dla przedmiotu: ${subjectId} to ${gradesMode}`);
  };

  if (isLoading || grades.length === 0 || Object.keys(finalGrades).length === 0) {
    return <div>Loading...</div>;
  }



  const gradesCount = grades.reduce((countMap, grade) => {
    const value = grade.value;
    countMap[value] = (countMap[value] || 0) + 1;
    return countMap;
  }, {});
  
  const myData = Object.entries(gradesCount).map(([value, count]) => ({
    angle: count,
    label: `Ocena ${value}`,
  }));
  

  const countGradesBySubject = (grades, subjects) => {
    const counts = subjects.map((subject, i) => {
      console.log("i", i);
      const subjectGrades = grades.filter((grade) => grade.subjectId === subject._id);
      return {
        x: i,
        y: subjectGrades.length,
        label: subject.name
      };
    });
  
    return counts;
  };
  
  // Użyj tej funkcji w komponencie:
  const barChartData = countGradesBySubject(grades, subjects);
  console.log("barChartData", barChartData);
  


  const countGrades = (grades) => {
    const counts = grades.map((grades, i) => {
      console.log("i", i);
      return {
        x: i,
        y: grades.value,
        label: grades.value.toString(),
      };
    });
  
    return counts;
  };
  
  // Użyj tej funkcji w komponencie:
  const lineChartData = countGrades(grades);
  console.log("lineChartData", lineChartData);
  
  const handleToggleCharts = () => {
    setIsChartsVisible(!isChartsVisible);
  };
  

  const calculatePercentage = () => {
    console.log("grades:", grades);
    console.log("selectedGradeForPercentage:", selectedGradeForPercentage);
    
    const selectedGrade = parseFloat(selectedGradeForPercentage);
    console.log("selectedGrade:", selectedGrade);
  
    if (!isNaN(selectedGrade)) {
      const result = percentageNumberOfMarks(grades, selectedGrade);
      console.log("result:", result);
  
      setPercentageResult(`Procentowy udział oceny ${selectedGrade} w zbiorze to ${result.toFixed(2)}%`);
    } else {
      setPercentageResult('Wprowadź poprawną ocenę.');
    }
  };
  

  return (
    <>
    <div className="marks-table">
      <table className="table-of-grades">
        <thead>
          <tr className="marks-table-tr">
            <th className="marks-table-th">Przedmiot</th>
            <th className="marks-table-th">Oceny</th>
            <th className="marks-table-th">Średnia <br />arytmetyczna</th>
            <th className="marks-table-th">Średnia <br />ważona</th>
            <th className="marks-table-th">Mediana</th>
            <th className="marks-table-th">Dominanta</th>
            <th className="marks-table-th">Przewidywana ocena <br />końcowa</th>
            <th className="marks-table-th">Ocena <br /> końcowa</th>
          </tr>
        </thead>
        <tbody>
        {grades && grades.length > 0 && Object.entries(groupGradesBySubject(grades)).map(([subjectId, gradeIds]) => {

    const subject = subjects.find(sub => sub._id === subjectId);
    const values = gradeIds.map(gradeId => grades.find(g => g._id === gradeId).value);
    const finalGradesForSubject = getFinalGradesForSubject(finalGrades, subject?.name || '');
    // const finalGradesIds = handleDeleteFinalGradeClick( )

    const isFinalGradeExist = finalGradesForSubject.length > 0;


    return (
        <tr key={subjectId} className="marks-table-tr">
            <td className="marks-table-td">{subject ? uppercaseFirstLetterOfSubject(subject.name) : ''}</td>
            {values.map((grade, index) => {
                const gradeInfo = grades.find(g => g._id === gradeIds[index]);
                const gradeStyle = gradesColors(grade);

                return (
                  <TippyTooltip
                  className="tippy-tooltip"
                  key={index}
                  title={`Ocena: ${grade}, Waga: ${gradeInfo?.weight}, Komentarz: ${gradeInfo?.comment}`}
                  position="top"
                  trigger="mouseenter"
                >
                    {/* <button
                      className="grade-button"
                      style={{ backgroundColor: gradeStyle }}
                      onClick={() => handleGradeClick(subjectId, gradeIds[index])}
                    > */}
                      <button
                        className="grade-button"
                        style={{ backgroundColor: gradeStyle }}
                        onClick={() => {
                          setSelectedGrade(gradeInfo);
                          setIsDialogOpen(true);
                        }}
                      >
                        {grade}
                      </button>
                    </TippyTooltip>
                  
                );
            })}
            <button className="grade-button-2" onClick={() => handleAddGradeClick(subjectId)}>+</button>
            <td className="marks-table-td">{countArithmeticAverage(values)}</td>
            <td className="marks-table-td">{countWeightedAverage(values, grades, subjectId)}</td>
            <td className="marks-table-td">{median(values)}</td>
            <td className="marks-table-td">{mode(values).join(', ')}</td>
            <td className="marks-table-td">{calculateExpectedGrade(countWeightedAverage(values, grades, subjectId))}</td>
            <td className="marks-table-td">
            {isFinalGradeExist ? (
                    <button className="grade-button" onClick={() => handleDeleteFinalGradeClick(subjectId)}>
                        {finalGradesForSubject.length > 0 ? finalGradesForSubject[0] : 'Brak oceny'}
                    </button>
                ) : (
                    <React.Fragment>
                        <button className="grade-button" onClick={() => handleDeleteFinalGradeClick(subjectId)}>
                            {finalGradesForSubject.length > 0 ? finalGradesForSubject[0] : 'Brak oceny'}
                        </button>
                        <button className="grade-button-2" onClick={() => handleAddFinalGradeClick(subjectId)}>+</button>
                    </React.Fragment>
                )}
</td>

        </tr>
    );
})}
        </tbody>
      </table>
      {/* <ViewSubject grades={grades} /> */}


      <hr className="marks-hr table-marks-hr" />

      <div className="elements-marks-view">
        <h2 className="marks-h2">
          Twoja średnia z całego roku: {fullYearAverage(finalGrades)}
          <br />
          Świadectwo z paskiem: {isCertificateWithHonors(fullYearAverage(finalGrades))}
        </h2>
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Co chcesz zrobić?</DialogTitle>
        <DialogContent>
          <Button id="button-in-modal-window-table-marks" onClick={() => handleGradeEditClick(selectedGrade.subjectId, selectedGrade._id)}>
            Edytuj ocenę
          </Button>
          <Button id="button-in-modal-window-table-marks" onClick={() => handleGradeDeleteClick(selectedGrade.subjectId, selectedGrade._id)}>
            Usuń ocenę
          </Button>
          <Button id="button-in-modal-window-table-marks" onClick={() => setIsDialogOpen(false)}>
            Anuluj
          </Button>
        </DialogContent>
      </Dialog>

    </div>

    <div className="elements-marks-percentage">
  <h3>Procentowy udział wybranej oceny w zbiorze wszystkich ocen cząstkowych</h3>
  <input
    type="number"
    placeholder="Wprowadź ocenę"
    value={selectedGradeForPercentage}
    onChange={(e) => setSelectedGradeForPercentage(e.target.value)}
  />
  <button onClick={() => calculatePercentage()} className="grade-button">Oblicz udział</button>
  <p>{percentageResult !== null ? percentageResult : ''}</p>
</div>


    <div className="div-button-diagrams"><button onClick={handleToggleCharts} className="grade-button" >
        {isChartsVisible ? "Ukryj wykresy" : "Pokaż wykresy"}
      </button></div>
      {isChartsVisible && (
      <div className="table-marks-diagram">
              
      <div className="diagram-container-header">
      <h3>Diagram kołowy</h3>
      <h3>Diagram słupkowy</h3>
      <h3>Diagram liniowy</h3>
      </div>

      <div className="diagram-container">
      <RadialChartComponent data={myData}/>
      <BarChartComponent barChartData={barChartData} />
      <LineChartComponent lineChartData={lineChartData} selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />
      </div>

       
     </div> 
     )}
    </ >
  );
};
