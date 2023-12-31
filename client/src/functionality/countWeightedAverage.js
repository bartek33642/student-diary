// export const countWeightedAverage = (values, grades, subject) => {
//   if (!grades || grades.length === 0) {
//     return 0;
//   }

//   // Filtruj oceny dotyczące danego przedmiotu
//   const filteredGrades = grades.filter((grade) => grade.subjectName === subject);

//   // filteredGrades.forEach(function (grade) {
//   //   console.log("Wartość grade", grade);
//   //   let value = grade.value;
//   //   let weight = grade.weight;
//   //   console.log("Wartość value w forEach", value);
//   //   console.log("Wartość weight w forEach", weight);
//   // });

//   // console.log("Nazwa przedmiotu: ", subject);
//   // console.log("Wartości weight i value dla przedmiotu: ", filteredGrades);

//   // Suma iloczynów wartości i wag ocen
//   const sumWeighted = filteredGrades.reduce((acc, grade) => {
//     return acc + grade.value * grade.weight;
//   }, 0);

//   // Suma wag ocen
//   const sumWeights = filteredGrades.reduce((acc, grade) => {
//     return acc + grade.weight;
//   }, 0);

//   // Oblicz średnią ważoną
//   const weightedAverage = sumWeighted / sumWeights;

//   return Math.round(weightedAverage * 100) / 100;
// };


// const countWeightedAverage = (values, allGrades, subjectId) => {
//   const subjectGrades = allGrades.filter((grade) => grade.subjectId === subjectId);

//   if (subjectGrades.length === 0 || subjectGrades.length !== values.length) {
//     throw new Error('Input value is wrong');
//   }

//   const invalidValues = values.some(value => value === null || value < 0 || value > 6);
//   if (invalidValues) {
//     throw new Error('Input value is wrong');
//   }

//   const invalidWeights = subjectGrades.some(grade => grade.weight === null || grade.weight < 0);
//   if (invalidWeights) {
//     throw new Error('Weight value is wrong');
//   }

//   const totalWeight = subjectGrades.reduce((sum, grade) => sum + grade.weight, 0);

//   if (totalWeight === 0) {
//     throw new Error('Division by zero');
//   }

//   const weightedSum = values.reduce((sum, value, index) => {
//     const weight = subjectGrades[index].weight;
//     return sum + value * weight;
//   }, 0);

//   const average = weightedSum / totalWeight;
//   return Math.round(average * 100) / 100;
// };

// module.exports = countWeightedAverage;

const countWeightedAverage = (values, allGrades, subjectId) => {
  const subjectGrades = allGrades.filter((grade) => grade.subjectId === subjectId);

  // Jeśli nie ma ocen dla danego przedmiotu, zwróć null lub inną wartość oznaczającą brak danych
  if (subjectGrades.length === 0 || subjectGrades.length !== values.length) {
    return null;
  }

  const invalidValues = values.some(value => value === null || value < 0 || value > 6);
  if (invalidValues) {
    throw new Error('Input value is wrong');
  }

  const invalidWeights = subjectGrades.some(grade => grade.weight === null || grade.weight < 0);
  if (invalidWeights) {
    throw new Error('Weight value is wrong');
  }

  const totalWeight = subjectGrades.reduce((sum, grade) => sum + grade.weight, 0);

  if (totalWeight === 0) {
    throw new Error('Division by zero');
  }

  const weightedSum = values.reduce((sum, value, index) => {
    const weight = subjectGrades[index].weight;
    return sum + value * weight;
  }, 0);

  const average = weightedSum / totalWeight;
  return Math.round(average * 100) / 100;
};

module.exports = countWeightedAverage;
