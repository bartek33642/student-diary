const percentageNumberOfMarks = require("../src/functionality/percentageNumberOfMarks");

describe('percentageNumberOfMarks', () => {
    let errorSpy;

    beforeAll(() => {
        errorSpy = jest.spyOn(console, 'error');
        errorSpy.mockImplementation(() => {});
    });

    afterAll(() => {
        errorSpy.mockRestore();
    });

    it('should return null when allGrade is not a number', () => {
        const grades = [{ value: 5 }, { value: 4 }, { value: 3 }];
        const allGrade = 'five';
        const result = percentageNumberOfMarks(grades, allGrade);
        expect(result).toBeNull();
        expect(console.error).toHaveBeenCalledWith('Oczekiwana ocena musi być liczbą.');
    });

    it('should return 0 when there are no matching grades', () => {
        const grades = [{ value: 5 }, { value: 4 }, { value: 3 }];
        const allGrade = 2;
        const result = percentageNumberOfMarks(grades, allGrade);
        expect(result).toBe(0);
    });

    it('should return the correct percentage of matching grades', () => {
        const grades = [{ value: 5 }, { value: 4 }, { value: 5 }];
        const allGrade = 5;
        const result = percentageNumberOfMarks(grades, allGrade);
        expect(result).toBeCloseTo(66.67, 2);
    });
});
