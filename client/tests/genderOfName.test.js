const genderOfName = require("../src/functionality/genderOfName");

const exceptions = [
  'Kuba', 'Barnaba', 'Bonawentura', 'Kosma', 'Dyzma', 'Jarema', 'Lasota',
  'Niepełka', 'Rokita', 'Zawisza', 'Żegota', 'Agryppa', 'Akwila', 'Andrea',
  'Elia', 'Elisza', 'Esa', 'Esra', 'Gösta', 'Iikka', 'Isaia', 'Jehuda',
  'Jona', 'Juda', 'Jukka', 'Joshua', 'Kosma', 'Malachia', 'Mihnea', 'Miikka',
  'Mika', 'Mircea', 'Miska', 'Neta', 'Neemia', 'Nicola', 'Noah', 'Luca',
  'Reima', 'Samppa', 'Sasza', 'Sila', 'Tuwia', 'Veikka', 'Zacharia', 'Zaccaria'
];

describe('genderOfName', () => {
  it('should return "kobieta" for names ending with "a"', () => {
    const result = genderOfName('Anna');
    expect(result).toBe('kobieta');
  });

  it('should return "mężczyzna" for names not ending with "a"', () => {
    const result = genderOfName('Jan');
    expect(result).toBe('mężczyzna');
  });

  it('should return "mężczyzna" for names in the exceptions list', () => {
    exceptions.forEach(name => {
      const result = genderOfName(name);
      expect(result).toBe('mężczyzna');
    });
  });

  it('should handle case sensitivity for names', () => {
    const result = genderOfName('jan');
    expect(result).toBe('mężczyzna');
  });
});
