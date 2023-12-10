const gradesColors = require('../src/functionality/gradesColors');

// test dla oceny 6
test('Grade 6 = green', () => {
    const result = gradesColors(6);
    expect(result).toBe("green");
});

//test dla oceny 3 
test('Grade 3 = orange', () => {
    const result = gradesColors(3);
    expect(result).toBe("orange");
});

//test dla oceny 2.5
test('Grade 2 & 2.5 = #85852f', () => {
    const result = gradesColors(2.5);
    expect(result).toBe("#85852f");
});

//test dla oceny 8
test('Grade >6 & <0 = darkgray', () => {
    const result = gradesColors(8);
    const result2 = gradesColors(-2)
    expect(result).toBe("darkgray");    
    expect(result2).toBe("darkgray");
});

// test dla wartości null
test('Grade null', () => {
    expect(() => gradesColors(null)).toThrowError('Input is null');
});

