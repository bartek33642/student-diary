const fullYearAverage = require('../src/functionality/fullYearAverage');

// Test dla pustego obiektu finalGrades
test('Full year average - empty input', () => {
    const result = fullYearAverage({});
    expect(result).toBe(0);
  });
  
  // Test dla obiektu finalGrades z pustymi ocenami
  test('Full year average - empty grades', () => {
    const result = fullYearAverage({
      subject1: [{ value: [] }],
      subject2: [{ value: [] }],
    });
    expect(result).toBe(0);
  });
  
  // Test dla obiektu finalGrades z jedną oceną
  test('Full year average - single grade', () => {
    const result = fullYearAverage({
      subject1: [{ value: [4] }],
      subject2: [{ value: [5] }],
    });
    expect(() => (result).toBe(4.5));
  });
  
  // Test dla obiektu finalGrades z wieloma ocenami
  test('Full year average - multiple grades', () => {
    const result = fullYearAverage({
      subject1: [{ value: [4, 3, 5] }],
      subject2: [{ value: [5, 5, 4] }],
    });
    expect(() => (result).toBe(4.33));
  });
  
  // Test dla obiektu finalGrades z ocenami różnych długości
  test('Full year average - grades of different lengths', () => {
    const result = fullYearAverage({
      subject1: [{ value: [4, 3, 5] }],
      subject2: [{ value: [5, 5, 4, 3] }],
    });
    expect(() => (result).toBe(4.25));
  });

    // Test dla obiektu finalGrades z null
    test('Full year average - grades with null values', () => {
        expect(() => fullYearAverage({
            subject1: [{ value: [4, null, 5] }],
            subject2: [{ value: [5, 5, 4, 3] }],
        })).toThrowError("Invalid input: Array contains non-numeric values");
    });
  