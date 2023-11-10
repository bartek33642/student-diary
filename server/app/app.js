const express = require('express');

// Utwórz instancję aplikacji Express
const app = express();

// Definiuj trasę podstawową
app.get('/', (req, res) => {
    res.send('Witaj, to jest mój pierwszy serwer Express!');
});

// Nasłuchuj na określonym porcie
const port = 3001;
app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});