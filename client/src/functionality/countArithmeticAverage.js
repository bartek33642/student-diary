export const countArithmeticAverage = (grades) => {
    if (!grades || grades.length === 0) {
      return 0;
    }
  
    // Suma wartości ocen
    const sum = grades.reduce((acc, grade) => {
      return acc + grade;
    }, 0);
  
    // Oblicz średnią arytmetyczną
    const average = sum / grades.length;
  
    return Math.round(average * 100) / 100;
  };

  
