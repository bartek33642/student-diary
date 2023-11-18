// export const countWeightedAverage = (grades,value,weight) => {
//     if (!grades || grades.length === 0 || value === 0 || weight === 0) {
//       return 0;
//     }

//     grades.forEach(function (){
//         console.log("Wartość grade",grades);
//         let value = grades.value;
//         let weight = grades.weight;
//         console.log("Wartość value w forEach",value);
//         console.log("Wartość weight w forEach",weight);
//     })

    
//     console.log("Wartość weight: ", grades.weight);
//     console.log("Wartość grades przed filtrowaniem:", grades);

  
//     // Suma iloczynów wartości i wag ocen
//     const sumWeighted = grades.reduce((acc, grade) => {
//       return acc + grade.value * grade.weight;
//     }, 0);
  
//     // Suma wag ocen
//     const sumWeights = grades.reduce((acc, grade) => {
//       return acc + grade.weight;
//     }, 0);
  
//     // Oblicz średnią ważoną
//     const weightedAverage = sumWeighted / sumWeights;
  
//     return Math.round(weightedAverage * 100) / 100;
//   };

export const countWeightedAverage = (grades) => {
    if (!grades || grades.length === 0) {
      return 0;
    }
  
    const validGrades = grades.filter(grade => typeof grade.value === 'number' && typeof grade.weight === 'number');
  
    if (validGrades.length === 0) {
      console.warn("Brak poprawnych ocen. Zwracanie 0.");
      return 0;
    }
  
    const sumWeighted = validGrades.reduce((acc, grade) => acc + grade.value * grade.weight, 0);
    const sumWeights = validGrades.reduce((acc, grade) => acc + grade.weight, 0);
  
    const weightedAverage = Math.round((sumWeighted / sumWeights) * 100) / 100;
  
    return weightedAverage;
  };
  




// export const countWeightedAverage = (values, weights) => {
//     if (!values || values.length === 0 || !weights || weights.length === 0 || values.length !== weights.length) {
//         return 0;
//     }

//     grades.forEach(function (grade){
//         let value = grade.value;
//         let weight = grade.weight;
//         console.log("Wartość value w forEach",value);
//         console.log("Wartość weight w forEach",weight);
//     })

//     // Suma iloczynów wartości i wag ocen
//     const sumWeighted = values.reduce((acc, value, index) => {
//         return acc + value * weights[index];
//     }, 0);

//     // Suma wag ocen
//     const sumWeights = weights.reduce((acc, weight) => {
//         return acc + weight;
//     }, 0);

//     // Oblicz średnią ważoną
//     const weightedAverage = sumWeighted / sumWeights;

//     return Math.round(weightedAverage * 100) / 100;
// };
