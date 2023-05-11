const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'controllers')));

app.get('/style.css', (req, res) => {
  res.type('text/css');
  res.sendFile(path.join(__dirname, '../public/styles/style.css'));
});
// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });