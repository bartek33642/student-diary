const percentageNumberOfMarks = (grades, allGrade) => {
    // Sprawdź, czy oczekiwana ocena jest liczbą
    if (typeof allGrade !== 'number') {
      console.error('Oczekiwana ocena musi być liczbą.');
      return null;
    }
  
    // Liczba wszystkich ocen
    const totalGrades = grades.length;
    // console.log ("allGrade", allGrade);

    // Liczba ocen równej oczekiwanej ocenie
    const matchingGrades = grades.filter(grade => grade.value === allGrade).length;
  
    // Oblicz procentowy udział
    const percentage = (matchingGrades / totalGrades) * 100;
  
    return percentage;
  };
  
module.exports = percentageNumberOfMarks;
  