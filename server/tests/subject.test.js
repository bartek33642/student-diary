//subject.test.js

import mongoose from "mongoose";
import subjectsDAO from "../app/DAO/subjectsDAO";
import config from "../app/config";
import supertest from "supertest";
import app from "../app/app";

const subjectData = {
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

describe('Subjects DAO', () => {

  it('should get all subject', async () => {
    const subjects = await subjectsDAO.query();
    expect(subjects).toBeDefined();
    expect(Array.isArray(subjects)).toBe(true);
  });


  it('should get subject by id', async () => {
    const subjectGetById = await supertest(app)
    .get(`/subjects/${subjectData.subjectId}`)
    expect(subjectGetById.statusCode).toBe(200);
  });


  describe("POST /subjects", () => {
    it("should add new subject", async () => {
      const dataToSave = {
        name: "Historia"
      };
    
      let response = await supertest(app)
        .post("/subjects")
        .send(dataToSave)
      expect(response.statusCode).toBe(201); // Sprawdź, czy kod statusu to 201
      expect(response.body.name).toBe(dataToSave.name); // Sprawdź, czy nazwa zwróconego przedmiotu jest taka sama jak nazwa wysłanego przedmiotu
  
      // // Teraz spróbujmy dodać ten sam przedmiot ponownie
      // response = await supertest(app)
      //   .post("/subjects")
      //   .send(dataToSave)
      // expect(response.statusCode).toBe(400); // Powinniśmy otrzymać kod statusu 400, ponieważ przedmiot o tej nazwie już istnieje
      // expect(response.body.error).toBe('Przedmiot o tej nazwie już istnieje.'); // Sprawdź, czy komunikat o błędzie jest poprawny
    });
  });
  
});
