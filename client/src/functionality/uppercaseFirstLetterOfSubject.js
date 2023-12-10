const uppercaseFirstLetterOfSubject = (subjectName) => {

    if (subjectName === null || subjectName.length <=0 ) {
        throw new Error('Input is wrong');
    }

    if (!subjectName || typeof subjectName !== 'string') {
        return subjectName;
      }
    
      return subjectName.charAt(0).toUpperCase() + subjectName.slice(1);
};


module.exports = uppercaseFirstLetterOfSubject;