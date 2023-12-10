const calculateWeightedAverage = require('../src/functionality/countAverageCalculator')


// test dla poprawnej wartości 
test('Calculate Weighted Average - test1 - valid input', () => {
    const rows = [
        { value: '3', weight: '2' },
        { value: '4', weight: '3' },
        { value: '5', weight: '1' },
    ];

    const result = calculateWeightedAverage(rows);

    expect(result).toEqual(3.8333333333333335);
});


// test dla ujemnych wartości 
test('Calculate Weighted Average - test2 - negative values', () => {
    const rows = [
        { value: '-3', weight: '2' },
        { value: '4', weight: '-3' },
        { value: '-5', weight: '1' },
    ];

    expect(() => calculateWeightedAverage(rows)).toThrowError('Nieprawidłowe dane wejściowe. Wartość i waga nie mogą być ujemne.');
});

// test dla niepoprawnych danych wejściowych 
test('Calculate Weighted Average - test3 - invalid input', () => {
    const rows = [
        { value: 'abc', weight: '2' },
        { value: '4', weight: 'xyz' },
    ];

    expect(() => calculateWeightedAverage(rows)).toThrowError('Nieprawidłowe dane wejściowe. Wartość i waga muszą być liczbami.');
});


// test dla zera jako mianownik
test('Calculate Weighted Average - test4 - zero denominator', () => {
    const rows = [
        { value: '0', weight: '0' },
        { value: '0', weight: '0' },
    ];

    const result = calculateWeightedAverage(rows);

    expect(result).toEqual(0);
});


// test dla nulla jako wartość i waga
test('Calculate Weighted Average - test5 - null value or weight', () => {
    const rows = [
        { value: '3', weight: '2' },
        { value: null, weight: '3' },
        { value: '5', weight: null },
    ];

    expect(() => calculateWeightedAverage(rows)).toThrowError('Nieprawidłowe dane wejściowe. Wartość i waga muszą być liczbami.');
});


// test dla pustej tablicy
test('calculateWeightedAverage - test6 - empty array', () => {
    const rows = [];

    const result = calculateWeightedAverage(rows);
    expect(result).toEqual(0);
});

// test dla wszystkich wartości mających wartość null
test('calculateWeightedAverage - test7 - all null values', () => {
    const rows = [
        { value: null, weight: null },
        { value: null, weight: null },
        { value: null, weight: null },
    ];

    expect(() => calculateWeightedAverage(rows)).toThrowError('Nieprawidłowe dane wejściowe. Wartość i waga muszą być liczbami.');
});

// test dla pojedynczej wartości null
test('calculateWeightedAverage - test8 - single null value', () => {
    const rows = [
        { value: '3', weight: '2' },
        { value: null, weight: '3' },
        { value: '5', weight: '4' },
    ];

    expect(() => calculateWeightedAverage(rows)).toThrowError('Nieprawidłowe dane wejściowe. Wartość i waga muszą być liczbami.');
});