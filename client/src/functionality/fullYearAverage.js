// export const fullYearAverage = (finalGrades) => {
//     if (!finalGrades || Object.keys(finalGrades).length === 0) {
//       return 0;
//     }
  
//     const gradesValues = Object.values(finalGrades).map((grades) => {
//       return grades[0] ? grades[0].value : 0;
//     });
  
//     const sum = gradesValues.reduce((acc, value) => acc + value, 0);
//     const average = sum / gradesValues.length;

//     console.log("Average: ", average);
  
//     return Math.round(average * 100) / 100;
//   };

export const fullYearAverage = (finalGrades) => {
    if (!finalGrades || Object.keys(finalGrades).length === 0) {
      return 0;
    }
  
    const gradesValues = Object.values(finalGrades).flatMap((grades) => {
      if (grades[0] && grades[0].value) {
        return Array.isArray(grades[0].value) ? grades[0].value : [grades[0].value];
      }
      return [];
    });
  
    if (gradesValues.length === 0) {
      return 0;
    }
  
    const sum = gradesValues.reduce((acc, value) => acc + value, 0);
    const average = sum / gradesValues.length;
  
    console.log("Average: ", average);
  
    return average.toFixed(2);
  };
  