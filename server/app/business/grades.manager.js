import gradesDAO from '../DAO/gradesDAO';

function create(context) {
  async function createOrUpdateGrade(data) {
    try {
      return await gradesDAO.createOrUpdateGrade(data);
    } catch (error) {
      throw new Error(`Błąd w trakcie tworzenia lub aktualizacji oceny: ${error.message}`);
    }
  }

  async function getGradesBySubject(subjectId) {
    try {
      return await gradesDAO.getGradesBySubject(subjectId);
    } catch (error) {
      throw new Error(`Błąd w trakcie pobierania ocen dla przedmiotu: ${error.message}`);
    }
  }

  async function deleteGrade(gradeId) {
    try {
      return await gradesDAO.deleteGrade(gradeId);
    } catch (error) {
      throw new Error(`Błąd w trakcie usuwania oceny: ${error.message}`);
    }
  }

  return {
    createOrUpdateGrade: createOrUpdateGrade,
    getGradesBySubject: getGradesBySubject,
    deleteGrade: deleteGrade,
  };
}

export default {
  create: create,
};
