const isCertificateWithHonors = require('../src/functionality/isCertificateWithHonors');

// test dla wartości mniejszej niż 4.75
test('isCertificateWithHonors - test1 - number less than 4.75', () => {
    const result = isCertificateWithHonors(4.5); 
    expect(result).toBe('Nie');
});

// test dla wartości większej niż 4.75
test('isCertificateWithHonors - test2 - number bigger than 4.75', () => {
    const result = isCertificateWithHonors(4.85); 
    expect(result).toBe('Tak');
});

// test dla wartości null
test('isCertificateWithHonors - test3 - null value', () => {
    const result = isCertificateWithHonors(null); 
    expect(result).toBe('Brak ocen');
});

// test dla stringa jako wartości
test('isCertificateWithHonors - test4 - non-numeric value', () => {
    const result = isCertificateWithHonors('abc'); 
    expect(result).toBe('Błędna wartość');
});

// test dla zera bądź ujemnej wartości 
test('isCertificateWithHonors - test5 - zero or negative value', () => {
    const result = isCertificateWithHonors(-1); 
    expect(result).toBe('Błędna wartość');
});

// test dla wartości większej niż 4.75
test('isCertificateWithHonors - test6 - number bigger than 6.0', () => {
    const result = isCertificateWithHonors(7.11); 
    expect(() => (result).toThrow('Wartość poza zakresem'));
});