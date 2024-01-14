import mongoose from 'mongoose';
import config from '../app/config';
import app from '../app/app';
import request from 'supertest';

describe('Test połączenia z MongoDB', () => {
  beforeAll(async () => {
    await mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  it('powinno być połączone z MongoDB', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    const isConnected = mongoose.connection.readyState;
    expect(isConnected).toBe(1);
  });
  

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

describe('Sprawdź czy istnieją jakiekolwiek tabele w bazie danych', () => {
    beforeAll(async () => {
      await mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    });
  
    it('powinno zwrócić listę dostępnych kolekcji', async () => {
      const collections = await mongoose.connection.db.listCollections().toArray();
        expect(collections.length).toBeGreaterThan(0);
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  });

  describe('Test obsługi błędnej ścieżki', () => {
  it('powinno zwrócić plik index.html dla złej ścieżki', async () => {
    const response = await request(app).get('/invalid-path');

    expect(response.status).toBe(200);
    expect(response.text.startsWith('<!DOCTYPE html>')).toBe(true);

  });
});
