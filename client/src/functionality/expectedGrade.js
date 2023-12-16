// const calculateExpectedGrade = (weightedAverage) => {

//   if (weightedAverage === null || weightedAverage < 0) {
//     throw new Error('Input is wrong');
//   }

//     if (weightedAverage >= 1.0 && weightedAverage <= 1.50) {
//       return 1;
//     } else if (weightedAverage > 1.50 && weightedAverage <= 2.50) {
//       return 2;
//     } else if (weightedAverage > 2.50 && weightedAverage <= 3.50) {
//       return 3;
//     } else if (weightedAverage > 3.50 && weightedAverage <= 4.50) {
//       return 4;
//     } else if (weightedAverage > 4.50 && weightedAverage <= 5.50) {
//       return 5;
//     } else if (weightedAverage > 5.50 && weightedAverage <= 6.00) {
//       return 6;
//     } else if (weightedAverage > 6.00){
//         return "Jesteś poza skalą ocen";
//     }
//     else {
//       return 0; 
//     }
//   };
// module.exports = calculateExpectedGrade;

const calculateExpectedGrade = (weightedAverage) => {
  if (weightedAverage === null || weightedAverage < 0) {
    // Brak ocen, zwróć null lub inną wartość oznaczającą brak danych
    return null;
  }

  if (weightedAverage >= 1.0 && weightedAverage <= 1.50) {
    return 1;
  } else if (weightedAverage > 1.50 && weightedAverage <= 2.50) {
    return 2;
  } else if (weightedAverage > 2.50 && weightedAverage <= 3.50) {
    return 3;
  } else if (weightedAverage > 3.50 && weightedAverage <= 4.50) {
    return 4;
  } else if (weightedAverage > 4.50 && weightedAverage <= 5.50) {
    return 5;
  } else if (weightedAverage > 5.50 && weightedAverage <= 6.00) {
    return 6;
  } else if (weightedAverage > 6.00){
    return "Jesteś poza skalą ocen";
  } else {
    return 0; // Ocenę 0 możesz zwrócić jako wartość domyślną, gdy żaden z warunków nie jest spełniony
  }
};

module.exports = calculateExpectedGrade;
