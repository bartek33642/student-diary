const median  = require('../src/functionality/median')

// test dla poprawnej wartości - nieparzystych wartości
test('Median of numbers - test1 - odd numbers', () => {
    expect(median([1, 3, 6])).toBe(3)
});

// test dla poprawnej wartości - parzystych wartości
test('Median of numbers - test2 - even numbers', () => {
    expect(median([1, 6])).toBe(3.5)
});

// test dla pustej tablicy - sprawdza czy jest 0 elementów w tablicy
test('Median of numbers - test3 - empty array', () => {
    expect(median([])).toBe(0);
});

// test dla różnych typów wartości 
test('Median of numbers - test4 - mixed types in array', () => {
expect(median([1, 2.5, 3, 4.2, 5])).toBe(3);
});

// test dla ujemnych liczb
test('Median of numbers - test5 - negative numbers', () => {
    expect(median([-5, -2, 0, 2, 5])).toBe(0);
});

// test dla nieposortowanych liczb
test('Median of numbers - test6 - unsorted numbers ', () =>{
    expect(median([5, 3, 0, -1, 6])).toBe(3);
});

// test dla wartości string - test przechodzi, ponieważ jest sprawdzany czy pojawi się błąd
test('Median of numbers - test7 - string value', () => {
    expect(() => median([5, 'ab', 0, -1, 6])).toThrow('Invalid input: Array contains non-numeric values');
});

// test dla wartości null - test przechodzi, ponieważ jest sprawdzane czy pojawi się błąd 
test('Median of numbers - test8 - null value', () => {
    expect(() => median([5, null, 0, -1, 6])).toThrow('Invalid input: Array contains non-numeric values');
});
