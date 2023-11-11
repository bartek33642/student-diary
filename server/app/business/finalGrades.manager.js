import finalGradesDAO from '../DAO/finalGradesDAO';

function create(context) {
  async function createOrUpdateFinalGrade(data) {
    try {
      return await finalGradesDAO.createOrUpdateFinalGrade(data);
    } catch (error) {
      throw new Error(`Błąd w trakcie tworzenia lub aktualizacji oceny końcowej: ${error.message}`);
    }
  }

  async function getFinalGradesBySubject(subjectId) {
    try {
      return await finalGradesDAO.getFinalGradesBySubject(subjectId);
    } catch (error) {
      throw new Error(`Błąd w trakcie pobierania ocen końcowych dla przedmiotu: ${error.message}`);
    }
  }

  async function deleteFinalGrade(finalGradeId) {
    try {
      return await finalGradesDAO.deleteFinalGrade(finalGradeId);
    } catch (error) {
      throw new Error(`Błąd w trakcie usuwania oceny końcowej: ${error.message}`);
    }
  }

  return {
    createOrUpdateFinalGrade: createOrUpdateFinalGrade,
    getFinalGradesBySubject: getFinalGradesBySubject,
    deleteFinalGrade: deleteFinalGrade,
  };
}

export default {
  create: create,
};
