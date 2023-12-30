import finalGradesManager from './finalGrades.manager';
import gradesManager from './grades.manager';
import subjectsManager from './subjects.manager';
import userManager from './user.manager';

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}

export default {
  getSubjectsManager: getter(subjectsManager),
  getGradesManager: getter(gradesManager),
  getFinalGradesManager: getter(finalGradesManager),
  getUserManager: getter(userManager)
};
