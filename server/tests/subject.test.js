//subject.test.js

import mongoose from "mongoose";
import subjectsDAO from "../app/DAO/subjectsDAO";
import config from "../app/config";

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

    // console.log('All subjects:', subjects);

    expect(subjects).toBeDefined();
    expect(Array.isArray(subjects)).toBe(true);
  });
});
