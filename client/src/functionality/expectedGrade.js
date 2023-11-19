export const calculateExpectedGrade = (weightedAverage) => {
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
    }
    else {
      return 0; 
    }
  };
  