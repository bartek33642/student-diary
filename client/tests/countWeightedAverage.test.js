const countWeightedAverage = require('../src/functionality/countWeightedAverage')

// test dla poprawnej wartości 
test('Weighted Average - test1 - correct values', () => {
    const values = [2,4,1];
    const allGrades = [
        {subjectId: 'subject1', weight: 1},
        {subjectId: 'subject1', weight: 3},
        {subjectId: 'subject1', weight: 2},
    ];

    const subjectId = 'subject1';
    
    const expected = 2.67;

    const result = countWeightedAverage(values, allGrades, subjectId);
    expect(result).toEqual(expected);
});

// test dla niepoprawnej wartości 
test('Weighted Average - test2 - uncorrect values', () => {
    const values = [8, 6, 9];
    const allGrades = [
        { subjectId: 'subject1', weight: 1 },
        { subjectId: 'subject1', weight: 3 },
        { subjectId: 'subject1', weight: 2 },
    ];

    const subjectId = 'subject1';

    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Input value is wrong');
});


// test dla nulla jako wartości
test('Weighted Average - test3 - null values', () => {
    const values = [2, null, 1];
    const allGrades = [
        { subjectId: 'subject1', weight: 1 },
        { subjectId: 'subject1', weight: 3 },
        { subjectId: 'subject1', weight: 2 },
    ];

    const subjectId = 'subject1';

    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Input value is wrong');
});

// test dla nulla jako wagi
test('Weighted Average - test4 - null weight', () => {
    const values = [2, 4, 1];
    const allGrades = [
        { subjectId: 'subject1', weight: 1 },
        { subjectId: 'subject1', weight: 3 },
        { subjectId: 'subject1', weight: null },
    ];

    const subjectId = 'subject1';
    
    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Weight value is wrong');
});


// test dla ujemnych wartości
test('Weighted Average - test5 - values less than zero', () => {
    const values = [-3, 2, 0];
    const allGrades = [
        { subjectId: 'subject1', weight: 1 },
        { subjectId: 'subject1', weight: 3 },
        { subjectId: 'subject1', weight: 2 },
    ];

    const subjectId = 'subject1';

    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Input value is wrong');
});

// test dla ujemnej wagi
test('Weighted Average - test6 - weight less than zero', () => {
    const values = [5, 2, 0];
    const allGrades = [
        { subjectId: 'subject1', weight: -4 },
        { subjectId: 'subject1', weight: 3 },
        { subjectId: 'subject1', weight: 2 },
    ];

    const subjectId = 'subject1';

    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Weight value is wrong');
});

// test dla dzielenia przez zero
test('Weighted Average - test7 - division by zero', () => {
    const values = [3, 2, 1];
    const allGrades = [
        { subjectId: 'subject1', weight: 0 },
        { subjectId: 'subject1', weight: 0 },
        { subjectId: 'subject1', weight: 0 },
    ];

    const subjectId = 'subject1';

    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Division by zero');
});

// test dla różnej długości tablic
test('Weighted Average - test8 - different array lengths', () => {
    const values = [3, 2, 1, 4];
    const allGrades = [
        { subjectId: 'subject1', weight: 2 },
        { subjectId: 'subject1', weight: 1 },
        { subjectId: 'subject1', weight: 3 },
    ];

    const subjectId = 'subject1';

    expect(() => countWeightedAverage(values, allGrades, subjectId)).toThrowError('Input value is wrong');
});