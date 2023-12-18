import mongoose from "mongoose";
import gradesDAO from "../app/DAO/gradesDAO";
import config from "../app/config";
import supertest from "supertest";
import app from "../app/app";

const gradesData = {
  subjectId: '657dc0b1bb5e88bd6d442c15',
  gradeId: '65802b015d26f64ec90eeb8a',
  finalGradeId: '658026ce6e4963e26474c1c0', 
  gradeIdForDelete: '658051fa0d37bef07bf99f62',
  finalGradeIdForDelete: '658052110d37bef07bf9a011'
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

describe("POST /grades", () => {
  it("should add new grade", async () => {
    const dataToSave = {
      value: 3,
      weight: 2,
      comment: 'kartkowka - poprawa druga',
      subjectId: gradesData.subjectId
    };

    const response = await supertest(app)
      .post("/grades")
      .send(dataToSave)
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe();
  });
});

describe("DELETE /grades/:gradeId", () => {
  it("should delete new subject", async () => {

    let response = await supertest(app)
      .delete("/grades/" + gradesData.gradeIdForDelete)
    expect(response.statusCode).toBe(200); 

  });
});

describe("GET /finalGrades/:subjectId", () => {

it('should get final-grades by subjectId', async () => {
    const finalGradesGetById = await supertest(app)
    .get(`/finalGrades/${gradesData.subjectId}`)
    expect(finalGradesGetById.statusCode).toBe(200);
  });

});

describe("DELETE /finalGrades/:finalGradeId", () => {
  it("should delete new final-grade", async () => {
    let response = await supertest(app)
    .delete("/finalGrades/" + gradesData.finalGradeIdForDelete)
    expect(response.statusCode).toBe(200)

  });
});


});


