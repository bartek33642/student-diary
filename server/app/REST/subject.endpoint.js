import { body, validationResult } from 'express-validator';
import business from "../business/business.container";
import { isValidObjectId } from "mongoose";
const express = require('express');
const router = express();

export const subjectEndpoint = (router) => {
  // Pobierz wszystkie przedmioty
  router.get('/subjects', async (req, res) => {
    try {
      const subjects = await business.getSubjectsManager().query();
      res.status(200).send(subjects);
    } catch (error) {
      console.error('Błąd podczas pobierania przedmiotów:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania przedmiotów.' });
    }
  });

  // Pobierz przedmiot o określonym ID
  router.get('/subjects/:id', async (req, res) => {
    const subjectId = req.params.id;
    const nameSubject = req.params.name;

    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: 'Nieprawidłowy format ID przedmiotu.' });
    }

    try {
      const subject = await business.getSubjectsManager(subjectId).query();
      console.log("subjectName: ", nameSubject);
      if (!subject) {
        return res.status(404).json({ error: 'Przedmiot o podanym ID nie istnieje.' });
      }

      // res.status(200).send(subjectId);
      res.json(subjectId);
    } catch (error) {
      console.error('Błąd podczas pobierania przedmiotu:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania przedmiotu.' });
    }
  });

  // Dodaj nowy przedmiot
  router.post('/subjects', [
    body('name').isString().trim().notEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.', details: errors.array() });
    }

    const { name } = req.body;
    const subjectData = { name };

    try {
      // const createdSubject = await business.subjectBusiness.createOrUpdateSubject(subjectData);
      const createdSubject = await business.getSubjectsManager().createOrUpdate(subjectData);
      res.status(201).send(createdSubject);
    } catch (error) {
      console.error('Błąd podczas dodawania przedmiotu:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas dodawania przedmiotu.' });
    }
  });

  // Aktualizuj przedmiot o określonym ID
  router.put('/subjects/:id', [
    body('name').isString().trim().notEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe.', details: errors.array() });
    }

    const subjectId = req.params.id;

    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: 'Nieprawidłowy format ID przedmiotu.' });
    }

    const { name } = req.body;
    const subjectData = { subjectId, name };

    try {
      // const updatedSubject = await business.subjectBusiness.createOrUpdateSubject(subjectData);
      const updatedSubject = await business.getSubjectsManager().createOrUpdate(subjectData);
      res.status(200).send(updatedSubject);
      // res.json(updatedSubject);
    } catch (error) {
      console.error('Błąd podczas aktualizacji przedmiotu:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji przedmiotu.' });
    }
  });

  // Usuń przedmiot o określonym ID
  router.delete('/subjects/:id', async (req, res) => {
    const subjectId = req.params.id;

    if (!isValidObjectId(subjectId)) {
      return res.status(400).json({ error: 'Nieprawidłowy format ID przedmiotu.' });
    }

    try {
      const deletedSubject = await business.getSubjectsManager().deleteSubject(subjectId);

      if (!deletedSubject) {
        return res.status(404).json({ error: 'Przedmiot o podanym ID nie istnieje.' });
      }

      // res.json({ message: 'Przedmiot został usunięty.' });
      res.status(200).send({ message:  `Przedmiot o id: ${subjectId} został usunięty.` });

    } catch (error) {
      console.error('Błąd podczas usuwania przedmiotu:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas usuwania przedmiotu.' });
    }
  });
};