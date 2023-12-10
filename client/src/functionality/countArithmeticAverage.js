const countArithmeticAverage = (grades) => {
  if (!grades || grades.length === 0) {
      return 0;
  }

  // console.log('Grades:', grades);

  if (grades.some(grade => grade < 0)) {
      throw new Error('Oceny nie mogą być mniejsze od 0.');
  }

  if (grades.some(grade => grade === null)) {
      // console.log('NULL Grade Detected');
      throw new Error('Oceny nie mogą być null');
  }

  // Suma wartości ocen
  const sum = grades.reduce((acc, grade) => {
      return acc + grade;
  }, 0);

  // Oblicz średnią arytmetyczną
  const average = sum / grades.length;

  return Math.round(average * 100) / 100;
};

module.exports = countArithmeticAverage;