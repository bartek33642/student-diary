// import mongoose from "mongoose";
// import gradesDAO from "../app/DAO/gradesDAO";
// import subjectsDAO from "../app/DAO/subjectsDAO";
// import config from "../app/config";

// const subjectData = {
//     _id: new mongoose.Types.ObjectId(), // Utwórz nowy ObjectId
//     name: 'Historia i Społeczeństwo',
//     subjectId: new mongoose.Types.ObjectId().toString(), // Użyj _id z subjectData
//   };
  
//   const gradeData = {
//     _id: new mongoose.Types.ObjectId(),
//     value: 3,
//     weight: 1,
//     comment: 'Test wiedzy',
//     subjectId: subjectData._id, // Użyj _id z subjectData
//     gradeId: mongoose.Types.ObjectId.toString()
//   };

//   describe("Grades DAO Tests", () => {
//     let grade = {};
//     let subject = {}; // Zmienna do przechowywania utworzonego przedmiotu
  
//     beforeEach(async () => {
//       await mongoose.connect(config.databaseUrl);
//       subject = await subjectsDAO.createOrUpdate(subjectData);
//       gradeData.subjectId = subject._id; // Ustaw prawidłowe _id dla oceny
//       grade = await gradesDAO.createOrUpdateGrade(gradeData);
//   });

//   afterEach(async () => {
//     await subjectsDAO.deleteSubject(subject._id);
//     await gradesDAO.deleteGrade(grade.gradeId);
//     subject = {};
//     grade = {};
//     await mongoose.connection.close();
//   });

//   describe("createOrUpdateGrade", () => {
//     it("should create new grade", async () => {
//       const dataToSave = {
//         value: 4,
//         weight: 1,
//         comment: 'Test wiedzy - poprawa',
//         subjectId: subject._id,
//         gradeId: grade._id
//       };

//       const createdGrade = await gradesDAO.createOrUpdateGrade(dataToSave);
//       expect(createdGrade.value).toBe(4);
//     });

//     it("should update existing grade", async () => {
//       const dataToUpdate = {
//         value: 5,
//         weight: 1,
//         comment: 'Test wiedzy - poprawa 2',
//         subjectId: subject._id,
//         gradeId: grade._id
//       };

//       const updatedGrade = await gradesDAO.createOrUpdateGrade(dataToUpdate);
//       expect(updatedGrade.value).toBe(3);
//     });
//   });

//   describe("getGradesBySubject", () => {
//     it("should return all grades for provided subjectId", async () => {
//       const grades = await gradesDAO.getGradesBySubject(subject._id);
//       expect(grades.length).toBeGreaterThan(0);
//     });
//   });

//   describe("deleteGrade", () => {
//     it("should delete grade by id", async () => {
//       await gradesDAO.deleteGrade(grade.gradeId);
//       const deletedGrade = await gradesDAO.getGradesBySubject(subject._id);
//       expect(deletedGrade).toBeUndefined();
//     });
//   });

//   describe("getAllGrades", () => {
//     it("should return all grades", async () => {
//       const grades = await gradesDAO.getAllGrades();
//       expect(grades.length).toBeGreaterThan(0);
//     });
//   });
// });

// grade.test.js

import mongoose from "mongoose";
import gradesDAO from "../app/DAO/gradesDAO";
import config from "../app/config";
import supertest from "supertest";
import app from "../app/app";

const gradesData = {
  subjectId: '657dc493bb5e88bd6d442c7a'
}
beforeAll(async () => {
  await mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Grades DAO', () => {

  it('should get all grades', async () => {
    const grades = await gradesDAO.getAllGrades('all');
    expect(grades).toBeDefined();
    expect(Array.isArray(grades)).toBe(true);
  });

it('should get grade by id', async () => {
  const gradesGetById = await supertest(app)
  .get(`/grades/${gradesData.subjectId}`)
  expect(gradesGetById.status).toBe(200);

});


});
