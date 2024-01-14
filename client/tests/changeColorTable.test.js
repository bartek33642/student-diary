const changeColorTable = require("../src/functionality/changeColorTable.js");

describe("changeColorTable", () => {
  beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    jest.spyOn(global.console, 'error').mockImplementation(() => {});

    global.localStorage.setItem.mockImplementationOnce(() => {
      throw errorMock;
    });

    const result = changeColorTable(subjectId, color);

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      `subjectColor_${subjectId}`,
      color
    );
    expect(result).toBeNull();
    expect(global.console.error).toHaveBeenCalledWith(
      'Błąd podczas zmiany koloru:',
      errorMessage
    );
  });
});
