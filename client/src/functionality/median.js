const median = (grades) => {
    if (!grades || grades.length === 0) {
      return 0;
    }
  
    if (!grades.every(value => typeof value === 'number' && value !== null)) {
      throw new Error('Invalid input: Array contains non-numeric values');
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

  module.exports = median;
  