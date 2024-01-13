const countAge = require("../src/functionality/countAge");

describe('countAge', () => {
  it('should correctly calculate age for a past birthdate', () => {
    const birthDate = '1990-01-01';
    const result = countAge(birthDate);
    expect(result).toBe(34); 
  });

  it('should correctly calculate age for a future birthdate (not happened yet this year)', () => {
    const birthDate = '2000-12-31';
    const result = countAge(birthDate);
    expect(result).toBe(23); 
  });

  it('should correctly calculate age for the current birthdate (birthday today)', () => {
    const today = new Date();
    const birthDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const result = countAge(birthDate);
    expect(result).toBe(0);
  });

  it('should correctly calculate age for a future birthdate (already happened this year)', () => {
    const birthDate = '2002-01-01';
    const result = countAge(birthDate);
    expect(result).toBe(22); 
  });

  it('should handle invalid input gracefully and return NaN', () => {
    const result = countAge('invalidDate');
    expect(isNaN(result)).toBe(true);
  });
});
