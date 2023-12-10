const gradesColors = (grade) => {
    const gradeValue = parseFloat(grade);
    // console.log('Received grade:', grade);

    if (grade === null) {
      throw new Error('Input is null');
  }

    if (gradeValue === 6) {
      return 'green';
    } else if (gradeValue === 5 || gradeValue === 5.5) {
      return '#000045';
    } else if (gradeValue === 4 || gradeValue === 4.5) {
      return 'purple';
    } else if (gradeValue === 3 || gradeValue === 3.5) {
      return 'orange';
    } else if (gradeValue === 2 || gradeValue === 2.5) {
      return '#85852f';
    } else if (gradeValue === 1 || gradeValue === 1.5) {
      return 'maroon';
    } else if (gradeValue > 6 || gradeValue < 1) {
      return 'darkgray';
    } else {
      return 'darkgray'; // Dodaj odpowiedni kolor dla przypadku domyślnego
    }
};
module.exports = gradesColors;