// server.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const itemRoutes = require('./routes/itemRoutes');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Usa las rutas definidas
app.use('/', itemRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});