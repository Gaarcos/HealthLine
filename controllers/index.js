const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Queue = require('./queue');
const PriorityQueue = require('./priorityQueue');

const app = express();
const secretKey = 'minha-chave-secreta';

// Middleware para interpretar o corpo da requisição como um objeto JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Simula um banco de dados de usuários
const users = [];

// Rota de cadastro de usuário
app.post('/cadastro', (req, res) => {

  const { email, password, fullName, phone, cep, adress, adressNumber, adressComplement, sex, birthDate, cpf, civilState } = req.body;

  // Verifica se o email já está em uso
  if (users.find(user => user.email === email)) {
    return res.status(422).json({ message: 'Email já cadastrado' });
  }
  if (users.find(user => user.cpf === cpf)) {
    return res.status(422).json({ message: 'CPF já cadastrado' });
  }
  if (users.find(user => user.phone === phone)) {
    return res.status(422).json({ message: 'Telefone já cadastrado' });
  }

  // Cria um novo usuário e o adiciona no banco de dados
  const newUser = { email, password, fullName, phone, cep, adress, adressNumber, adressComplement, sex, birthDate, cpf, civilState };
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
  return res.send('login feito!')

  // Gera um token JWT com a chave secreta
  // const token = jwt.sign({ email }, secretKey);

  // Retorna o token
  // res.json({ token });
});

//Rota para ver informações do usuário
app.post('/usuario/infos', (req, res) => {
  const { email } = req.body;

  // Verifica se o email e a senha são válidos
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Email inválido' });
  }

  res.json({ nome: user.fullname, email: user.email, telefone: user.phone, CEP: user.cep, endereço: user.adress, nascimento: user.birthDate });

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
  const name = req.query.name;
  if (queue.isEmpty()) {
    res.status(400).send('A fila está vazia.');
  } else {
    queue.dequeue();

    res.send(`Elemento removido da fila: ${name}`);
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
    else if (position === 0) {
      res.send(`O elemento ${elementName} é o proximo a ser chamado`);
    }
    else {
      res.send(`O elemento ${elementName} está na posição ${position + 1} da fila.`);
    }
  }
});


// Retorna todos os elementos na fila
app.get('/queue/elements', (req, res) => {
  const elements = queue.toArray();

  res.send(`Elementos na fila: ${elements.map(e => `${e.name}`).join(', ')}`);
});

const priorityQueue = new PriorityQueue();

// Adiciona um elemento na fila prioritária
app.post('/priorityQueue/enqueue', (req, res) => {
  const name = req.query.name;
  const doenca = req.query.doenca;
  if (doenca != 'morrendo') {
    res.status(800).send('você deve entrar na fila normal, pois não atende aos requisitos de prioridade.')
  }
  if (!name) {
    res.status(400).send('O parâmetros "name" obrigatórios.');
  } else {
    priorityQueue.enqueue({ name });
    res.send(`Elemento com nome ${name} adicionado à fila prioritária.`);
  }
});


// Remove um elemento da fila prioritária
app.delete('/priorityQueue/dequeue', (req, res) => {
  const name = req.query.name;
  if (priorityQueue.isEmpty()) {
    res.status(400).send('A fila está vazia.');
  } else {
    priorityQueue.dequeue();

    res.send(`Elemento removido da fila prioritária: ${name}`);
  }
});

// Retorna o tamanho da fila prioritária
app.get('/priorityQueue/size', (req, res) => {
  const size = priorityQueue.size();

  res.send(`Tamanho da fila prioritária: ${size}`);
});

// Retorna a posição de um elemento na fila prioritária
app.get('/priorityQueue/position', (req, res) => {
  const elementName = req.query.name;

  if (!elementName) {
    res.status(400).send('O parâmetro "name" é obrigatório.');
  } else {
    const position = priorityQueue.indexOf(elementName);

    if (position === -1) {
      res.send(`O elemento ${elementName} não está na fila prioritária.`);
    }
    else if (position === 0) {
      res.send(`O elemento ${elementName} é o proximo a ser chamado na fila prioritária`);
    }
    else {
      res.send(`O elemento ${elementName} está na posição ${position + 1} da fila prioritária.`);
    }
  }
});

// Retorna todos os elementos na fila prioritária
app.get('/priorityQueue/elements', (req, res) => {
  const elements = priorityQueue.toArray();

  res.send(`Elementos na fila prioritária: ${elements.map(e => `${e.name}`).join(', ')}`);
});

//Retorna as receitas de um usuário
app.get('/getPrescription', (req,res) =>{
  const { email } = req.body;
  // Verifica se o email e a senha são válidos
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Email inválido' });
  }

  res.json({ receita: user.prescriptions });

  });

app.post('/sendPrescription', (req,res) =>{
  const { email , prescription } = req.body;
  
  // Verifica se o email e a senha são válidos
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Email inválido' });
  }
  user.prescriptions = prescription;

  // Retorna uma mensagem de sucesso
  res.send(`Prescrição adicionada com sucesso: ${user.prescriptions}`);
})
// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
