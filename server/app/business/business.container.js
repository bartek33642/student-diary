import finalGradesManager from './finalGrades.manager';
import gradesManager from './grades.manager';
import subjectsManager from './subjects.manager';

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
  getSubjectsManager: getter(subjectsManager),
  getGradesManager: getter(gradesManager),
  getFinalGradesManager: getter(finalGradesManager),
};
