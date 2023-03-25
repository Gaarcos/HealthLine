const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Queue = require('./queue');


const app = express();
const secretKey = 'minha-chave-secreta';

// Middleware para interpretar o corpo da requisição como um objeto JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Simula um banco de dados de usuários
const users = [];

// Rota de cadastro de usuário
app.post('/cadastro', (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email já está em uso
  if (users.find(user => user.email === email)) {
    return res.status(422).json({ message: 'Email já cadastrado' });
  }

  // Cria um novo usuário e o adiciona no banco de dados
  const newUser = { email, password };
  users.push(newUser);

  // Retorna uma mensagem de sucesso
  res.json({ message: 'Usuário cadastrado com sucesso' });
});

// Rota de login de usuário
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email e a senha são válidos
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  // Gera um token JWT com a chave secreta
  const token = jwt.sign({ email }, secretKey);

  // Retorna o token
  res.json({ token });
});

// Rota protegida
app.get('/protegido', (req, res) => {
  // Obtém o token JWT enviado pelo cliente
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  // Verifica se o token é válido
  try {
    const decoded = jwt.verify(token, secretKey);
    // Retorna uma mensagem de sucesso se o token é válido
    res.json({ message: `Bem-vindo, ${decoded.email}!` });
  } catch (err) {
    // Retorna um erro de autenticação se o token for inválido
    res.status(401).json({ message: 'Token inválido' });
  }
});

const queue = new Queue();

// Adiciona um elemento na fila
app.post('/queue/enqueue', (req, res) => {
  const element = req.body.element;

  queue.enqueue(element);

  res.send('Elemento adicionado à fila.');
});

// Remove um elemento da fila
app.delete('/queue/dequeue', (req, res) => {
  if (queue.isEmpty()) {
    res.status(400).send('A fila está vazia.');
  } else {
    const element = queue.dequeue();

    res.send(`Elemento removido da fila: ${element}`);
  }
});



// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
