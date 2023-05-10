app.use(express.static(path.join(__dirname, 'controllers')));

app.get('/style.css', (req, res) => {
  res.type('text/css');
  res.sendFile(path.join(__dirname, '../views/style.css'));
});
// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });