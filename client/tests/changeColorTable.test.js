const changeColorTable = require("../src/functionality/changeColorTable.js");

global.localStorage = {
    setItem: jest.fn(),
  };
  
  describe("changeColorTable", () => {
    afterEach(() => {
      global.localStorage.setItem.mockClear();
    });
  
    it("should change color in localStorage and return object with subjectId and new color", () => {
      const subjectId = 1;
      const color = "blue";
  
      const result = changeColorTable(subjectId, color);
  
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        `subjectColor_${subjectId}`,
        color
      );
      expect(result).toEqual({ subjectId, color });
    });
  
    it("should handle errors and log an error message", () => {
      const subjectId = 1;
      const color = "blue";
      const errorMessage = "Some error message";
      const errorMock = new Error(errorMessage);
  
      global.localStorage.setItem.mockImplementationOnce(() => {
        throw errorMock;
      });
  
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  
      const result = changeColorTable(subjectId, color);
  
      expect(global.localStorage.setItem).toHaveBeenCalledWith(
        `subjectColor_${subjectId}`,
        color
      );
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Błąd podczas zmiany koloru:',
        errorMessage
      );
  
      consoleErrorSpy.mockRestore();
    });
  });