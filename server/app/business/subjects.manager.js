// subjects.manager.js
import subjectsDAO from '../DAO/subjectsDAO';

function create(context) {
  async function query() {
    try {
      return await subjectsDAO.query();
    } catch (error) {
      throw new Error(`Błąd w trakcie pobierania przedmiotów: ${error.message}`);
    }
  }

  async function get(id) {
    try {
      return await subjectsDAO.get(id);
    } catch (error) {
      throw new Error(`Błąd w trakcie pobierania przedmiotu: ${error.message}`);
    }
  }


  async function createOrUpdate(data) {
    try {
      console.log('Data received in subjects.manager.createOrUpdate:', data);
      const updatedSubject = await subjectsDAO.createOrUpdate(data);
      return updatedSubject;
    } catch (error) {
      console.error('Błąd podczas aktualizacji przedmiotu:', error);
      throw error;
    }
  }

  async function deleteSubject(id) {
    try {
      return await subjectsDAO.deleteSubject(id);
    } catch (error) {
      throw new Error(`Błąd w trakcie usuwania przedmiotu: ${error.message}`);
    }
  }

  return {
    query: query,
    get: get,
    createOrUpdate: createOrUpdate,
    deleteSubject: deleteSubject,
  };
}

export default {
  create: create,
};
