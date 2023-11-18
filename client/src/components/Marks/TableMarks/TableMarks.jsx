// import React, { useEffect, useState } from "react";
// import "./TableMarksStyle.css";
// import { ajax } from 'rxjs/ajax';
// import { catchError, map, switchMap, } from 'rxjs/operators';
// import { forkJoin } from 'rxjs';

// export const TableMarks = () => {
//   const [grades, setGrades] = useState([]);

//   useEffect(() => {
//     const fetchGrades = async () => {
//       const gradesEndpoint = 'http://localhost:3001/grades/all';
//       const subjectsEndpoint = 'http://localhost:3001/subjects';

//       const grades$ = ajax.getJSON(gradesEndpoint);
//       const subjects$ = ajax.getJSON(subjectsEndpoint);

//       forkJoin({ grades: grades$, subjects: subjects$ }).pipe(
//         catchError(error => {
//           console.error('Błąd podczas pobierania ocen i przedmiotów:', error.message);
//           return [];
//         })
//       ).subscribe({
//         next: data => {
//           const { grades, subjects } = data;
//           const mergedData = grades.map(grade => {
//             const subject = subjects.find(sub => sub._id === grade.subjectId);
//             return { ...grade, subjectName: subject ? subject.name : '' };
//           });
//           setGrades(mergedData);
//         },
//         error: error => console.error('Błąd podczas subskrybowania:', error),
//         complete: () => console.log('Subskrypcja zakończona')
//       });
//     };

//     fetchGrades();
//   }, []);

//   // Funkcja grupująca oceny według przedmiotu
//   const groupGradesBySubject = (grades) => {
//     const groupedGrades = {};
//     grades.forEach((grade) => {
//       if (!groupedGrades[grade.subjectName]) {
//         groupedGrades[grade.subjectName] = [grade.value];
//       } else {
//         groupedGrades[grade.subjectName].push(grade.value);
//       }
//     });
//     return groupedGrades;
//   };

//   return (
//     <div className="marks-table">
//       <table className="table-of-grades">
//         <thead>
//           <tr className="marks-table-tr">
//             <th className="marks-table-th">Przedmiot</th>
//             <th className="marks-table-th">Oceny</th>
//             <th className="marks-table-th">Średnia <br />arytmetyczna</th>
//             <th className="marks-table-th">Średnia <br />ważona</th>
//             <th className="marks-table-th">Mediana</th>
//             <th className="marks-table-th">Przewidywana ocena <br />końcowa</th>
//             <th className="marks-table-th">Ocena <br /> końcowa</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grades && grades.length > 0 && Object.entries(groupGradesBySubject(grades)).map(([subject, values]) => (
//             <tr key={subject} className="marks-table-tr">
//               <td className="marks-table-td">{subject}</td>
//               <td className="marks-table-td">{values.join(', ')}</td>
//               <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej arytmetycznej */}</td>
//               <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej ważonej */}</td>
//               <td className="marks-table-td">{/* Wstaw odpowiednie pole dla mediany */}</td>
//               <td className="marks-table-td">{/* Wstaw odpowiednie pole dla przewidywanej oceny końcowej */}</td>
//               <td className="marks-table-td">{/* Wstaw odpowiednie pole dla oceny końcowej */}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import "./TableMarksStyle.css";
import { ajax } from 'rxjs/ajax';
import { catchError, forkJoin } from 'rxjs';

export const TableMarks = () => {
  const [grades, setGrades] = useState([]);
  const [finalGrades, setFinalGrades] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gradesEndpoint = 'http://localhost:3001/grades/all';
        const subjectsEndpoint = 'http://localhost:3001/subjects';

        // Pobierz oceny i przedmioty równocześnie
        const { grades, subjects } = await forkJoin({
          grades: ajax.getJSON(gradesEndpoint),
          subjects: ajax.getJSON(subjectsEndpoint),
        }).toPromise();

        // Po pobraniu ocen i przedmiotów, przetwórz dane
        const mergedData = grades.map((grade) => {
          const subject = subjects.find((sub) => sub._id === grade.subjectId);
          return { ...grade, subjectName: subject ? subject.name : '' };
        });

        // Ustaw dane w stanie
        setGrades(mergedData);

        // Pobierz oceny końcowe dla każdego przedmiotu
        const finalGradesEndpoint = 'http://localhost:3001/finalGrades/';
        const finalGradesPromises = mergedData.map((grade) =>
          ajax.getJSON(`${finalGradesEndpoint}${grade.subjectId}`)
        );

        // Po pobraniu ocen końcowych, przetwórz dane
        const finalGradesData = await forkJoin(finalGradesPromises).toPromise();

        const finalGradesMap = finalGradesData.reduce((acc, data, index) => {
          const subjectName = mergedData[index].subjectName;
          acc[subjectName] = data;
          return acc;
        }, {});

        // Ustaw oceny końcowe w stanie
        setFinalGrades(finalGradesMap);

        // Zakończ ładowanie
        setIsLoading(false);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error.message);
        setIsLoading(false); // Zakończ ładowanie w przypadku błędu
      }
    };

    // Wywołaj funkcję pobierającą dane
    fetchData();
  }, []);

  // Funkcja grupująca oceny według przedmiotu
  const groupGradesBySubject = (grades) => {
    const groupedGrades = {};
    grades.forEach((grade) => {
      if (!groupedGrades[grade.subjectName]) {
        groupedGrades[grade.subjectName] = [grade.value];
      } else {
        groupedGrades[grade.subjectName].push(grade.value);
      }
    });
    return groupedGrades;
  };

  console.log('grades:', grades);
  console.log('finalGrades:', finalGrades);

  // Dodaj warunek, aby sprawdzić, czy dane są dostępne przed renderowaniem
  if (isLoading || grades.length === 0 || Object.keys(finalGrades).length === 0) {
    return <div>Loading...</div>; // lub inny komunikat
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
                <td className="marks-table-td">{values.join(', ')}</td>
                <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej arytmetycznej */}</td>
                <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej ważonej */}</td>
                <td className="marks-table-td">{/* Wstaw odpowiednie pole dla mediany */}</td>
                <td className="marks-table-td">{/* Wstaw odpowiednie pole dla przewidywanej oceny końcowej */}</td>
                <td className="marks-table-td">
                  {/* Wstaw odpowiednie pole dla oceny końcowej */}
                  {finalGrades[subject] && finalGrades[subject].value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
