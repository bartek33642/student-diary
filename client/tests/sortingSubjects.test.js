const assert = require('assert');
const sortingSubjects = require("../src/functionality/sortingSubjects");

describe('sortingSubjects', () => {
    it('should return an empty array when input is an empty array', () => {
        const subjects = [];
        const result = sortingSubjects(subjects);
        assert.deepStrictEqual(result, []);
    });

    it('should sort subjects by name in ascending order', () => {
        const subjects = [
            { name: 'Matematyka' },
            { name: 'Chemia' },
            { name: 'Fizyka' }
        ];
        const expected = [
            { name: 'Chemia' },
            { name: 'Fizyka' },
            { name: 'Matematyka' }
        ];
        const result = sortingSubjects(subjects);
        assert.deepStrictEqual(result, expected);
    });
});
