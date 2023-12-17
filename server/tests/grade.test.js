import mongoose from "mongoose";
import gradesDAO from "../app/DAO/gradesDAO";
import subjectsDAO from "../app/DAO/subjectsDAO";
import config from "../app/config";

const subjectData = {
    _id: new mongoose.Types.ObjectId(), // Utwórz nowy ObjectId
    name: 'kultura',
  };
  
  const gradeData = {
    _id: '6',
    value: 5,
    weight: 2,
    comment: 'kartkowka',
    subjectId: subjectData._id, // Użyj _id z subjectData
  };

  describe("Grades DAO Tests", () => {
    let grade = {};
    let subject = {}; // Zmienna do przechowywania utworzonego przedmiotu
  
    beforeEach(async () => {
      await mongoose.connect(config.databaseUrl);
      subject = await subjectsDAO.createOrUpdate(subjectData);
      gradeData.subjectId = subject._id; // Ustaw prawidłowe _id dla oceny
    grade = await gradesDAO.createOrUpdateGrade(gradeData);
  });

  afterEach(async () => {
    await subjectsDAO.deleteSubject(subject._id);
    await gradesDAO.deleteGrade(grade.gradeId);
    subject = {};
    grade = {};
    await mongoose.connection.close();
  });

  describe("createOrUpdateGrade", () => {
    it("should create new grade", async () => {
      const dataToSave = {
        value: 4,
        weight: 1,
        comment: 'kartkowka - poprawa',
        subjectId: subject._id,
        // Uzupełnij pozostałe dane oceny
      };

      const createdGrade = await gradesDAO.createOrUpdateGrade(dataToSave);
      expect(createdGrade.value).toBe(4);
    });

    it("should update existing grade", async () => {
      const dataToUpdate = {
        value: 2,
        weight: 4,
        comment: 'kartkowka - poprawa 2',
        subjectId: subject._id,
      };

      const updatedGrade = await gradesDAO.createOrUpdateGrade(dataToUpdate);
      expect(updatedGrade.value).toBe(3);
    });
  });

  describe("getGradesBySubject", () => {
    it("should return all grades for provided subjectId", async () => {
      const grades = await gradesDAO.getGradesBySubject(subject._id);
      expect(grades.length).toBeGreaterThan(0);
    });
  });

  describe("deleteGrade", () => {
    it("should delete grade by id", async () => {
      await gradesDAO.deleteGrade(grade.gradeId);
      const deletedGrade = await gradesDAO.getGradesBySubject(subject._id);
      expect(deletedGrade).toBeUndefined();
    });
  });

  describe("getAllGrades", () => {
    it("should return all grades", async () => {
      const grades = await gradesDAO.getAllGrades();
      expect(grades.length).toBeGreaterThan(0);
    });
  });
});