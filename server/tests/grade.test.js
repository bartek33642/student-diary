import mongoose from "mongoose";
import gradesDAO from "../app/DAO/gradesDAO";
import config from "../app/config";
import supertest from "supertest";
import request from 'supertest';
import app from "../app/app";

// const gradesData = {
//   subjectId: '657dc0b1bb5e88bd6d442c15',
//   gradeId: '65802b015d26f64ec90eeb8a',
//   finalGradeId: '658026ce6e4963e26474c1c0', 
//   gradeIdForDelete: '658051fa0d37bef07bf99f62',
//   finalGradeIdForDelete: '658052110d37bef07bf9a011'
// }
// beforeAll(async () => {
//   await mongoose.connect(config.databaseUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe('Grades DAO', () => {

//   it('should get all grades', async () => {
//     const grades = await gradesDAO.getAllGrades('all');
//     expect(grades).toBeDefined();
//     expect(Array.isArray(grades)).toBe(true);
//   });

// it('should get grade by id', async () => {
//   const gradesGetById = await supertest(app)
//   .get(`/grades/${gradesData.subjectId}`)
//   expect(gradesGetById.status).toBe(200);

// });

// // describe("POST /grades", () => {
// //   it("should add new grade", async () => {
// //     const dataToSave = {
// //       value: 3,
// //       weight: 2,
// //       comment: 'kartkowka - poprawa druga',
// //       subjectId: gradesData.subjectId
// //     };

// //     const response = await supertest(app)
// //       .post("/grades")
// //       .send(dataToSave)
// //     expect(response.statusCode).toBe(200);
// //     expect(response.body.name).toBe();
// //   });
// // });

// // describe("DELETE /grades/:gradeId", () => {
// //   it("should delete new subject", async () => {

// //     let response = await supertest(app)
// //       .delete("/grades/" + gradesData.gradeIdForDelete)
// //     expect(response.statusCode).toBe(200); 

// //   });
// // });

// describe("GET /finalGrades/:subjectId", () => {

// it('should get final-grades by subjectId', async () => {
//     const finalGradesGetById = await supertest(app)
//     .get(`/finalGrades/${gradesData.subjectId}`)
//     expect(finalGradesGetById.statusCode).toBe(200);
//   });

// });

// // describe("DELETE /finalGrades/:finalGradeId", () => {
// //   it("should delete new final-grade", async () => {
// //     let response = await supertest(app)
// //     .delete("/finalGrades/" + gradesData.finalGradeIdForDelete)
// //     expect(response.statusCode).toBe(200)

// //   });
// // });

// describe("GET /count-of-all-grades", () => {
//   it("should get the count of all grades", async () => {
//     try {
//       const response = await supertest(app).get("/count-of-all-grades");
//       expect(response.statusCode).toBe(200);
//       expect(response.body.countOfGrades).toBeDefined();
//       expect(typeof response.body.countOfGrades).toBe("number");
//     } catch (error) {
//       console.error("An error occurred during the test:", error);
//       throw error;
//     }
//   });
// });

// describe("GET /count-of-final-grades", () => {
//   it("should get the count of final grades", async () => {
//     try {
//       const response = await supertest(app).get("/count-of-final-grades");
//       expect(response.statusCode).toBe(200);
//       expect(response.body.countOfFinalGrades).toBeDefined();
//       expect(typeof response.body.countOfFinalGrades).toBe("number");
//     } catch (error) {
//       console.error("An error occurred during the test:", error);
//       throw error;
//     }
//   });
// });


// });

beforeAll(async () => {
  await mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Zamknij połączenie z bazą danych po zakończeniu testów
  await mongoose.connection.close();
});

describe('Testy punktów końcowych ocen', () => {
  let createdGradeId;
  let subjectId;

  beforeAll(async () => {
    // Dodaj kod inicjalizujący przed testami ocen
    const subjectRes = await request(app)
      .post('/subjects')
      .send({
        name: 'TestSubject'
      });

    subjectId = subjectRes.body._id;
  });

  afterAll(async () => {
    // Dodaj kod czyszczący po testach ocen, na przykład usuwający dodany przedmiot
    await request(app).delete(`/subjects/${subjectId}`);
  });

  it('Tworzy nową ocenę', async () => {
    const res = await request(app)
      .post('/grades')
      .send({
        value: Math.floor(Math.random() * 6) + 1,
        weight: Math.floor(Math.random() * 5) + 1,
        comment: 'Test comment',
        subjectId: subjectId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    createdGradeId = res.body._id;
  });

  it('Pobiera wszystkie oceny', async () => {
    const res = await request(app).get('/grades/all');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Pobiera oceny dla danego przedmiotu', async () => {
    const res = await request(app).get(`/grades/${subjectId}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Aktualizuje istniejącą ocenę', async () => {
    const res = await request(app)
      .put(`/grades/${createdGradeId}`)
      .send({
        value: Math.floor(Math.random() * 6) + 1,
        weight: Math.floor(Math.random() * 5) + 1,
        comment: 'Updated test comment',
        subjectId: subjectId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('Usuwa istniejącą ocenę', async () => {
    const res = await request(app).delete(`/grades/${createdGradeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Grade deleted successfully');
  });
});