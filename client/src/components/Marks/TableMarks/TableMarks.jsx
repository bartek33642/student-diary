// import React, { useEffect, useState } from "react";
// import "./TableMarksStyle.css";
// import { ajax } from 'rxjs/ajax';
// import { catchError, map } from 'rxjs/operators';

// export const TableMarks = () => {
//       const [grades, setGrades] = useState([]);

//       useEffect(() => {
//         const fetchGrades = async () => {
//           const endpoint = 'http://localhost:3001/grades/all'; // Nowy endpoint do pobierania ocen dla wszystkich przedmiotów
//           const response$ = ajax.getJSON(endpoint);
//           console.log("data z endpoint", endpoint);
    
//           response$.pipe(
//             map(response => response.data),
//             catchError(error => {
//               console.error('Błąd podczas pobierania ocen:', error.message);
//               return [];
//             })
//           ).subscribe({
//             next: data => setGrades(data),
//             error: error => console.error('Błąd podczas subskrybowania:', error),
//             complete: () => console.log('Subskrypcja zakończona')
//           });
//         };
    
//         fetchGrades();
//       }, []);
      

//     return(
// <div className="marks-table">
//       <table className="table-of-grades">
      
//         <thead>
//         <tr className="marks-table-tr">
//           <th className="marks-table-th">Przedmiot</th>
//           <th className="marks-table-th">Oceny</th>
//           <th className="marks-table-th">Średnia <br/>arytmetyczna</th>
//           <th className="marks-table-th">Średnia <br/>ważona</th>
//           <th className="marks-table-th">Mediana</th>
//           <th className="marks-table-th">Przewidywana ocena <br/>końcowa</th>
//           <th className="marks-table-th">Ocena <br /> końcowa</th>
//         </tr>
//         </thead>

//         <tbody>
//         {/* Mapowanie danych z grades */}
//         {grades && grades.map((grades, subjects) => (
//         <tr key={grades.gradeId} className="marks-table-tr">
//           <td className="marks-table-td">{subjects.name}</td>
//           <td className="marks-table-td">{grades.value}</td>
//           {/* Dodaj odpowiednie pola i wyrażenia dla średnich, mediany itp. */}
//           <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej arytmetycznej */}</td>
//           <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej ważonej */}</td>
//           <td className="marks-table-td">{/* Wstaw odpowiednie pole dla mediany */}</td>
//           <td className="marks-table-td">{/* Wstaw odpowiednie pole dla przewidywanej oceny końcowej */}</td>
//           <td className="marks-table-td">{/* Wstaw odpowiednie pole dla oceny końcowej */}</td>
//         </tr>
//       ))}
//         </tbody>
//       </table>
//     </div>
//     );
// }


import React, { useEffect, useState } from "react";
import "./TableMarksStyle.css";
import { ajax } from 'rxjs/ajax';
import { catchError, map, switchMap, } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


export const TableMarks = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchGrades = async () => {
      const gradesEndpoint = 'http://localhost:3001/grades/all';
      const subjectsEndpoint = 'http://localhost:3001/subjects';

      const grades$ = ajax.getJSON(gradesEndpoint);
      const subjects$ = ajax.getJSON(subjectsEndpoint);

      forkJoin({ grades: grades$, subjects: subjects$ }).pipe(
        catchError(error => {
          console.error('Błąd podczas pobierania ocen i przedmiotów:', error.message);
          return [];
        })
      ).subscribe({
        next: data => {
          const { grades, subjects } = data;
          const mergedData = grades.map(grade => {
            const subject = subjects.find(sub => sub._id === grade.subjectId);
            return { ...grade, subjectName: subject ? subject.name : '' };
          });
          setGrades(mergedData);
        },
        error: error => console.error('Błąd podczas subskrybowania:', error),
        complete: () => console.log('Subskrypcja zakończona')
      });
    };

    fetchGrades();
  }, []);

  
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
          {grades && grades.length > 0 && grades.map((grade) => (
            <tr key={grade.gradeId} className="marks-table-tr">
              <td className="marks-table-td">{grade.subjectName}</td>
              <td className="marks-table-td">{grade.value}</td>
              {/* Dodaj odpowiednie pola i wyrażenia dla średnich, mediany itp. */}
              <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej arytmetycznej */}</td>
              <td className="marks-table-td">{/* Wstaw odpowiednie pole dla średniej ważonej */}</td>
              <td className="marks-table-td">{/* Wstaw odpowiednie pole dla mediany */}</td>
              <td className="marks-table-td">{/* Wstaw odpowiednie pole dla przewidywanej oceny końcowej */}</td>
              <td className="marks-table-td">{/* Wstaw odpowiednie pole dla oceny końcowej */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
