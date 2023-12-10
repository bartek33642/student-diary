const isCertificateWithHonors = (fullYearAverage) => {
  if (fullYearAverage === null) {
    return 'Brak ocen';
  }

  const average = parseFloat(fullYearAverage);

  if (isNaN(average) || average <= 0) {
    return 'Błędna wartość';
  }

  if (average >= 6.0 ) {
    return 'Wartość poza zakresem';
  }
  
  return average >= 4.75 ? 'Tak' : 'Nie';
}

module.exports = isCertificateWithHonors;