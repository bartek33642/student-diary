import mongoose from "mongoose";
import finalGradesManager from "../app/DAO/finalGradesDAO";
import config from "../app/config";
import request from 'supertest';
import app from "../app/app";

beforeAll(async () => {
  await mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Testy punktów końcowych ocen końcowych', () => {
  let createdFinalGradeId;
  let subjectId;

  beforeAll(async () => {
    const subjectRes = await request(app)
      .post('/subjects')
      .send({
        name: 'TestSubject2'
      });

    subjectId = subjectRes.body._id;
  });

  afterAll(async () => {
    await request(app).delete(`/subjects/${subjectId}`);
  });

  it('Tworzy nową ocenę końcową', async () => {
    const res = await request(app)
      .post('/finalGrades')
      .send({
        value: Math.floor(Math.random() * 6) + 1,
        subjectId: subjectId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    createdFinalGradeId = res.body._id;
  });

  it('Pobiera oceny końcowe dla danego przedmiotu', async () => {
    const res = await request(app).get(`/finalGrades/${subjectId}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Aktualizuje istniejącą ocenę końcową', async () => {
    const res = await request(app)
      .put(`/finalGrades/${createdFinalGradeId}`)
      .send({
        value: Math.floor(Math.random() * 6) + 1,
        subjectId: subjectId
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('Usuwa istniejącą ocenę końcową', async () => {
    const res = await request(app).delete(`/finalGrades/${createdFinalGradeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Final grade deleted successfully');
  });

  it('Pobiera liczbę wszystkich ocen końcowych', async () => {
    const res = await request(app).get('/count-of-final-grades');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('countOfFinalGrades');
    expect(typeof res.body.countOfFinalGrades).toBe('number');
  });
});