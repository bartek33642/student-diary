const countArithmeticAverage = require('../src/functionality/countArithmeticAverage')

// test dla poprawnych wartości
test('countArithmeticAverage - valid input', () => {
    const grades = [4, 5, 3, 4, 5];

    const result = countArithmeticAverage(grades);

    expect(result).toEqual(4.2);
});

// test dla pustej tablicy
test('countArithmeticAverage - zero grades', () => {
    const grades = [];
    const result = countArithmeticAverage(grades);
    expect(result).toEqual(0);
});

// test dla ujemnych wartości w tablicy
test('countArithmeticAverage - negative grades', () => {
    const grades = [4, -5, 3, 4, 5];

    expect(() => countArithmeticAverage(grades)).toThrowError('Oceny nie mogą być mniejsze od 0.');
});

// test, gdy cała tablica jest nullem
test('countArithmeticAverage - null grades', () => {
    const grades = [null];

    expect(() => countArithmeticAverage(grades)).toThrowError('Oceny nie mogą być null');
});

// test, gdy jedną z wartości jest null
test('countArithmeticAverage - mixed grades with null', () => {
    const grades = [4, null, 3, 4, 5];

    expect(() => countArithmeticAverage(grades)).toThrowError('Oceny nie mogą być null');
});