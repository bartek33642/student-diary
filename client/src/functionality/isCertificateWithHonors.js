export const isCertificateWithHonors = (fullYearAverage) => {
    if (fullYearAverage >= 4.75) {
        return 'Tak';
      } else {
        return 'Nie';
      }
}