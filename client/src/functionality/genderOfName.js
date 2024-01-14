const exceptions = [
    'Kuba', 'Barnaba', 'Bonawentura', 'Kosma', 'Dyzma', 'Jarema', 'Lasota',
    'Niepełka', 'Rokita', 'Zawisza', 'Żegota', 'Agryppa', 'Akwila', 'Andrea',
    'Elia', 'Elisza', 'Esa', 'Esra', 'Gösta', 'Iikka', 'Isaia', 'Jehuda',
    'Jona', 'Juda', 'Jukka', 'Joshua', 'Kosma', 'Malachia', 'Mihnea', 'Miikka',
    'Mika', 'Mircea', 'Miska', 'Neta', 'Neemia', 'Nicola', 'Noah', 'Luca',
    'Reima', 'Samppa', 'Sasza', 'Sila', 'Tuwia', 'Veikka', 'Zacharia', 'Zaccaria'
  ];
  
  function genderOfName(name) {
    if (exceptions.includes(name)) {
      return 'mężczyzna';
    }
    return name.endsWith('a') ? 'kobieta' : 'mężczyzna';
  }
  
  module.exports = genderOfName;