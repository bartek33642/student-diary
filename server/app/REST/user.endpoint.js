import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { isValidObjectId } from "mongoose";
import userManager from '../business/user.manager';
const express = require('express');
const router = express();

export const userEndpoint = (router) => {

    router.get('/user', async (req, res) => {
    try {
      const users = await userManager.createUser().getUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error('Błąd podczas pobierania użytkowników:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania użytkowników.' });
    }
  });

router.post('/add-user', [
    body('first_name').isString().notEmpty(),
    body('second_name').isString().notEmpty(),
    body('birth_date').isDate().notEmpty(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const userData = req.body;
      const createdUser = await userManager.createUser().addUser(userData);
      res.json(createdUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  router.delete('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const deletedUser = await userManager.createUser().removeUser(userId);
      res.json(deletedUser);
    } catch (error) {
      console.error('Error in /user DELETE endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/user/:userId', [
    body('first_name').optional().isString(),
    body('second_name').optional().isString(),
    body('birth_date').optional().isDate(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const userId = req.params.userId;
      if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Nieprawidłowe ID użytkownika.' });
      }
  
      const userData = req.body;
      const updatedUser = await userManager.createUser().updateUser(userId, userData);
      if (!updatedUser) {
        return res.status(404).json({ error: 'Nie znaleziono użytkownika o podanym ID.' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error('Błąd podczas aktualizacji użytkownika:', error);
      res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji użytkownika.' });
    }
  });
}
