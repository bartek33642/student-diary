const sortingSubjects = (subjects) => {
    const sortedSubjects = [...subjects];

    sortedSubjects.sort((a, b) => a.name.localeCompare(b.name));
  
    return sortedSubjects;
}

module.exports = sortingSubjects;