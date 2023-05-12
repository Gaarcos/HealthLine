const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '../frontend/public');

const imagesPath = path.join(__dirname, '../frontend/public/imagens');

const stylesPath = path.join(__dirname, '../frontend/public/styles');

app.use(express.static(publicPath));

app.get('/style.css', (req, res) => {
  res.type('text/css');
  res.sendFile(path.join(stylesPath, 'styles.css'));
});

app.use('/imagens', express.static(imagesPath));

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(publicPath, 'cadastro.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(publicPath, 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(publicPath, 'login.html'));
});

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});