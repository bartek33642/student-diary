// const express = require('express');

// // Utwórz instancję aplikacji Express
// const app = express();

// // Definiuj trasę podstawową
// app.get('/', (req, res) => {
//     res.send('Witaj, to jest mój pierwszy serwer Express!');
// });

// // Nasłuchuj na określonym porcie
// const port = 3001;
// app.listen(port, () => {
//     console.log(`Serwer działa na porcie ${port}`);
// });

import bodyParser from 'body-parser';
import config from './config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes';

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(express.static('public'));

app.use(cors());

try {
    mongoose.connect(config.databaseUrl)
    console.log('Mongo connected')
 } catch (error) {
    console.log(error)
    process.exit()
 }
 
 process.on('SIGINT', () => {
    mongoose.connection.close();
    console.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
 });
 
 
 routes(app);
 
 app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
 });
 
 app.listen(config.port, function () {
  console.info(`Server is running at ${config.port}`)
 });