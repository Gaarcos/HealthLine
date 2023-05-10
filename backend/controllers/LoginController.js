// Rota de login de usuário sem token

app.post('/login/v1', (req, res) => {
    const {
      email,
      password
    } = req.body;
  
    // Verifica se o email e a senha são válidos
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      return res.status(401).json({
        message: 'Email ou senha inválidos'
      });
    }
    return res.send('login feito!')
  
  });