const calculateExpectedGrade = require('../src/functionality/expectedGrade');

// Test dla oceny 1
test('Expected grade for weighted average 1.0 is 1', () => {
    const result = calculateExpectedGrade(1.0);
    expect(result).toBe(1);
});

// Test dla oceny 2
test('Expected grade for weighted average 2.0 is 2', () => {
    const result = calculateExpectedGrade(2.0);
    expect(result).toBe(2);
});

// Test dla oceny 3
test('Expected grade for weighted average 3.0 is 3', () => {
    const result = calculateExpectedGrade(3.0);
    expect(result).toBe(3);
});

// Test dla oceny 4
test('Expected grade for weighted average 4.0 is 4', () => {
    const result = calculateExpectedGrade(4.0);
    expect(result).toBe(4);
});

// Test dla oceny 5
test('Expected grade for weighted average 5.0 is 5', () => {
    const result = calculateExpectedGrade(5.0);
    expect(result).toBe(5);
});

// Test dla oceny 6
test('Expected grade for weighted average 6.0 is 6', () => {
    const result = calculateExpectedGrade(6.0);
    expect(result).toBe(6);
});

// Test dla oceny poza skalą
test('Expected grade for weighted average 7.0 is "Jesteś poza skalą ocen"', () => {
    const result = calculateExpectedGrade(7.0);
    expect(result).toBe("Jesteś poza skalą ocen");
});

// Test dla oceny null
test('Expected grade for null is an error', () => {
    expect(() => calculateExpectedGrade(null)).toThrowError('Input is wrong');
});

// Test dla oceny -1
test('Expected grade for -1 is an error', () => {
    expect(() => calculateExpectedGrade(-1)).toThrowError('Input is wrong');
});

