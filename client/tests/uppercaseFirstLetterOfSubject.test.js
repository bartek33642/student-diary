const uppercaseFirstLetterOfSubject = require('../src/functionality/uppercaseFirstLetterOfSubject')

// Test poprawności danych
test('Uppercase first letter of a valid subject name', () => {
    lowerCasePhrase = 'matematyka'
    upperCasePhrase = 'Matematyka'
    const result = uppercaseFirstLetterOfSubject(lowerCasePhrase);
    expect(result).toBe(upperCasePhrase);
  });
  
  // Test dla pustego stringa
  test('Uppercase first letter of an empty subject name', () => {
    expect(() => uppercaseFirstLetterOfSubject('')).toThrowError('Input is wrong');

  });
  
  // Test dla wartości null
  test('Uppercase first letter of null subject name', () => {
    expect(() => uppercaseFirstLetterOfSubject(null)).toThrowError('Input is wrong');
});
  
  // Test dla wartości nie będącej stringiem
  test('Uppercase first letter of non-string input', () => {
    const result = uppercaseFirstLetterOfSubject(123);
    expect(result).toBe(123);
  });