const path = require('path');
const express = require('express');
const AuthController = require("./routes/AuthController");
const AdminController = require("./routes/AdminController");
const authenticateMiddleware = require("./config/middleware");
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();

const viewsPath = path.join(__dirname, '/views');
const imagesPath = path.join(__dirname, '/public/imagens');
const stylesPath = path.join(__dirname, '/public/styles');

// Configurando o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(stylesPath));
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

// Configurando a rota POST
app.post('/auth/register', (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(() => res.redirect('/login'))
    .catch(error => res.status(500).send(`Erro ao cadastrar o usuário: ${error}`));
});


module.exports = app;