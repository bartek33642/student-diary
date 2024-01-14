// changeColorTable.js

const changeColorTable = (subjectId, color) => {
    try {
      // Zapisz informacje o kolorze w localStorage
      localStorage.setItem(`subjectColor_${subjectId}`, color);
      // Zwróć obiekt z identyfikatorem przedmiotu i nowym kolorem
      return { subjectId, color };
    } catch (error) {
      console.error('Błąd podczas zmiany koloru:', error.message);
      return null;
    }
  };
  
  module.exports = changeColorTable;
  