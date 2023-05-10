//placeholder só
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
  });
//pegar a scripts, queue, prioqueue e index e separar com o que fizer sentido