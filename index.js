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
  const name = req.query.name;

  if (!name) {
    res.status(400).send('O parâmetros "name" obrigatórios.');
  } else {
    queue.enqueue({ name });
    res.send(`Elemento com nome ${name} adicionado à fila.`);
  }
});


// Remove um elemento da fila
app.delete('/queue/dequeue', (req, res) => {
  if (queue.isEmpty()) {
    res.status(400).send('A fila está vazia.');
  } else {
    const name = queue.dequeue();

    res.send(`Elemento removido da fila: ${element.name}`);
  }
});

// Retorna o tamanho da fila
app.get('/queue/size', (req, res) => {
  const size = queue.size();

  res.send(`Tamanho da fila: ${size}`);
});

// Retorna a posição de um elemento na fila
app.get('/queue/position', (req, res) => {
  const elementName = req.query.name;

  if (!elementName) {
    res.status(400).send('O parâmetro "name" é obrigatório.');
  } else {
    const position = queue.indexOf(elementName);

    if (position === -1) {
      res.send(`O elemento ${elementName} não está na fila.`);
    }
    else if(position=== 0){
      res.send(`O elemento ${elementName} é o proximo a ser chamado`);
    }
    else {
      res.send(`O elemento ${elementName} está na posição ${position} da fila.`);
    }
  }
});


// Retorna todos os elementos na fila
app.get('/queue/elements', (req, res) => {
  const elements = queue.toArray();

  res.send(`Elementos na fila: ${elements.map(e => `${e.name}: ${e.element}`).join(', ')}`);
});





// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
