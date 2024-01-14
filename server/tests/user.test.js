import mongoose from "mongoose";
import config from "../app/config";
const request = require('supertest');
import app from "../app/app";

let userId;

describe('GET /user', () => {
  it('should fetch all users', async () => {
    const response = await request(app).get('/user');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Jeśli istnieją użytkownicy, zapisz ID pierwszego użytkownika
    if (response.body.length > 0) {
      userId = response.body[0]._id;
    }
  });
});

describe('POST /add-user', () => {
  it('should create a new user', async () => {
    if (!userId) {
      const userData = {
        first_name: 'Brygida',
        second_name: 'Ludwińska',
        birth_date: '2001-09-15'
      };

      const response = await request(app)
        .post('/add-user')
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('first_name', userData.first_name);
      expect(response.body).toHaveProperty('second_name', userData.second_name);
      expect(response.body).toHaveProperty('birth_date', new Date(userData.birth_date).toISOString());

      // Zapisz ID nowo utworzonego użytkownika
      userId = response.body._id;
    }
  });
});

describe('PUT /user/:userId', () => {
  it('should update the user details', async () => {
    if (userId) {
      const userData = {
        first_name: 'Brygida',
        second_name: 'Ludwińska-Małecka',
        birth_date: '2001-09-14'
      };

      const response = await request(app)
        .put(`/user/${userId}`)
        .send(userData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('first_name', userData.first_name);
      expect(response.body).toHaveProperty('second_name', userData.second_name);
      expect(response.body).toHaveProperty('birth_date', new Date(userData.birth_date).toISOString());
    }
  });
});

describe('DELETE /user/:userId', () => {
  it('should delete a user and return status code 200', async () => {
    if (userId) {
      const response = await request(app)
        .delete(`/user/${userId}`)
        .send();

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', userId);

      // Zresetuj userId
      userId = null;
    }
  });
});