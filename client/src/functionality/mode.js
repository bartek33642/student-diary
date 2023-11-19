export const mode = (grades) => {
    if (!grades || grades.length === 0) {
      return [];
    }
  
    const uniqueGrades = new Set(grades);
  
    if (uniqueGrades.size === grades.length) {
      return ['Brak dominanty - dane występują tyle samo razy'];
    }
  
    const counts = {};
    let maxCount = 0;
  
    grades.forEach((grade) => {
      const roundedGrade = Math.round(grade * 10) / 10;
      counts[roundedGrade] = (counts[roundedGrade] || 0) + 1;
  
      if (counts[roundedGrade] > maxCount) {
        maxCount = counts[roundedGrade];
      }
    });
  
    const modeGrades = Object.keys(counts).filter(
      (grade) => counts[grade] === maxCount
    );
  
    return modeGrades;
  };
  