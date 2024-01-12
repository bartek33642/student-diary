import userDAO from "../DAO/userDAO";

function createUser(context) {
  
    async function getUsers() {
    try {
    //   return await userDAO.getUser();
    return await userDAO.query({});
    } catch (error) {
      throw new Error(`Błąd w trakcie pobierania użytkowników: ${error.message}`);
    }
  }

  async function addUser(data) {
    try {
      console.log("Jesteś w createUser - user.manager");
      return await userDAO.addUser(data);
    } catch (error) {
      throw new Error(`Błąd w trakcie tworzenia lub aktualizacji użytkownika: ${error.message}`);
    }
  }

  async function removeUser(userId) {
    try {
      return await userDAO.deleteUser(userId);
    } catch (error) {
      throw new Error(`Błąd w trakcie usuwania użytkownika: ${error.message}`);
    }
  }

  async function updateUser(userId, data) {
    try {
      return await userDAO.updateUser(userId, data);
    } catch (error) {
      throw new Error(`Błąd podczas aktualizacji użytkownika: ${error.message}`);
    }
  }

  return {
    getUsers: getUsers,
    addUser: addUser,
    updateUser: updateUser,
    removeUser: removeUser,
  };
}

export default {
    createUser: createUser,
  };