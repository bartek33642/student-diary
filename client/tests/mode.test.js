const mode  = require('../src/functionality/mode');

// test dla poprawnej wartości - nieparzysta ilość liczb w tablicy 
test('Mode of numbers - test1', () => {
    expect(mode([2, 2, 3, 5, 7])).toEqual([2]);
});

// test dla poprawnej wartości - nieposortowana nieparzysta ilość liczb w tablicy
test('Mode of numbers - test2', () => {
    expect(mode([9, 1, 7, 3, 7])).toEqual([7]);
});

// test dla poprawnej wartości - ujemne liczby - nieparzysta ilość liczb w tablicy
test('Mode of numbers - test3', () => {
    expect(mode([-1, 1, -1, 3, 7])).toEqual([-1]);
});

// test dla braku mody - nieparzysta ilość liczb w tablicy
test('Mode of numbers - test4', () => {
    expect(() => mode([4, 1, 0, 3, 7])).toThrowError[("Brak dominanty - dane występują tyle samo razy")];
});

// test dla wartości null - nieparzysta ilość liczb w tablicy
test('Mode of numbers - test5', () => {
    expect(() => mode([4, null, 0, 3, 7])).toThrowError('Invalid input: Array contains non-numeric values');
});


// test dla wartości ze string'iem - nieparzysta ilość liczb w tablicy
test('Mode of numbers - test6', () => {
    expect(() => mode([2, 'abc', 0, 3, 7])).toThrowError('Invalid input: Array contains non-numeric values');
});

