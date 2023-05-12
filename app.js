const path = require('path');
const express = require('express');
const AuthController = require("./routes/AuthController");
const AdminController = require("./routes/AdminController");
const authenticateMiddleware = require("./config/middleware");

const app = express();

const viewsPath = path.join(__dirname, './views');
const imagesPath = path.join(__dirname, './public/imagens');
const stylesPath = path.join(__dirname, './public/styles');

app.use(express.json());
app.use(express.static(viewsPath));
app.use('/imagens', express.static(imagesPath));

app.get('/style.css', (req, res) => {
res.type('text/css');
res.sendFile(path.join(stylesPath, 'styles.css'));
});

app.get('/cadastro', (req, res) => {
res.sendFile(path.join(viewsPath, 'cadastro.html'));
});

app.get('/home', (req, res) => {
res.sendFile(path.join(viewsPath, 'home.html'));
});

app.get('/login', (req, res) => {
res.sendFile(path.join(viewsPath, 'login.html'));
});

app.use("/auth", AuthController);
app.use("/admin", authenticateMiddleware, AdminController);

module.exports = app;