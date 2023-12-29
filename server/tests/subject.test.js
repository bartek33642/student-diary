import mongoose from "mongoose";
import subjectsDAO from "../app/DAO/subjectsDAO";
import config from "../app/config";
import supertest from "supertest";
import app from "../app/app";

const subjectData = {
    subjectId: '657dc0b1bb5e88bd6d442c15', 
    subjectIdForDelete: '658052290d37bef07bf9a03d' 

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
        name: "Historia i społeczeństwo"
      };
    
      let response = await supertest(app)
        .post("/subjects")
        .send(dataToSave)
      expect(response.statusCode).toBe(201); 
      expect(response.body.name).toBe(dataToSave.name);

    });
  });

  describe("DELETE /subjects/:subjectId", () => {
    it("should delete new subject", async () => {

      let response = await supertest(app)
        .delete("/subjects/" + subjectData.subjectIdForDelete)
      expect(response.statusCode).toBe(200); 
  
    });
  });

  describe("GET /count-of-subjects", () => {
    it("should get the count of subjects", async () => {
      try {
        const response = await supertest(app).get("/count-of-subjects");
        expect(response.statusCode).toBe(200);
        expect(response.body.countOfSubjects).toBeDefined();
        expect(typeof response.body.countOfSubjects).toBe("number");
      } catch (error) {
        console.error("An error occurred during the test:", error);
        throw error;
      }
    });
  });
});
