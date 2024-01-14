import mongoose from "mongoose";
import subjectsDAO from "../app/DAO/subjectsDAO";
import config from "../app/config";
import supertest from "supertest";
import app from "../app/app";

let subjectId;

describe('Subjects DAO', () => {

  beforeAll(async () => {
    await mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get all subjects', async () => {
    const response = await supertest(app).get('/subjects');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  describe("POST /subjects", () => {
    it("should add new subject", async () => {
      const dataToSave = {
        name: "Historia i społeczeństwo"
      };
    
      let response = await supertest(app)
        .post("/subjects")
        .send(dataToSave)
      expect(response.statusCode).toBe(201); 
      expect(response.body.name).toBe(dataToSave.name);

      subjectId = response.body._id;
    });
  });

  it('should get subject by id', async () => {
    const response = await supertest(app).get(`/subjects/${subjectId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(subjectId);
  });

  describe("PUT /subjects/:subjectId", () => {
    it("should update the subject", async () => {
      const updatedData = {
        name: "Nowa nazwa przedmiotu"
      };

      let response = await supertest(app)
        .put(`/subjects/${subjectId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
    });
  });

  describe("DELETE /subjects/:subjectId", () => {
    it("should delete the subject", async () => {
      let response = await supertest(app)
        .delete(`/subjects/${subjectId}`);
      expect(response.statusCode).toBe(200); 
    });
  });

});
