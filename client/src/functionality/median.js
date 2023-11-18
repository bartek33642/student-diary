export const median = (grades) => {
    if (!grades || grades.length === 0) {
      return 0;
    }
  
    // sortowanie ocen rosnąco
    const sortedGrades = [...grades].sort((a, b) => a - b);
  
    const length = sortedGrades.length;
  
    // Obliczenie mediany
    if (length % 2 === 0) {
      const mid1 = sortedGrades[length / 2 - 1];
      const mid2 = sortedGrades[length / 2];
      return (mid1 + mid2) / 2;
    } else {
      return sortedGrades[Math.floor(length / 2)];
    }
  };
  