export const countWeightedAverage = (values, grades, subject) => {
  if (!grades || grades.length === 0) {
    return 0;
  }

  // Filtruj oceny dotyczące danego przedmiotu
  const filteredGrades = grades.filter((grade) => grade.subjectName === subject);

  // filteredGrades.forEach(function (grade) {
  //   console.log("Wartość grade", grade);
  //   let value = grade.value;
  //   let weight = grade.weight;
  //   console.log("Wartość value w forEach", value);
  //   console.log("Wartość weight w forEach", weight);
  // });

  // console.log("Nazwa przedmiotu: ", subject);
  // console.log("Wartości weight i value dla przedmiotu: ", filteredGrades);

  // Suma iloczynów wartości i wag ocen
  const sumWeighted = filteredGrades.reduce((acc, grade) => {
    return acc + grade.value * grade.weight;
  }, 0);

  // Suma wag ocen
  const sumWeights = filteredGrades.reduce((acc, grade) => {
    return acc + grade.weight;
  }, 0);

  // Oblicz średnią ważoną
  const weightedAverage = sumWeighted / sumWeights;

  return Math.round(weightedAverage * 100) / 100;
};

