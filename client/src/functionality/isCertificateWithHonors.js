export const isCertificateWithHonors = (fullYearAverage) => {
    if (fullYearAverage >= 4.78) {
        return 'Tak';
      } else {
        return 'Nie';
      }
}