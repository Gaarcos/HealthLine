const express = require('express');
const app = express();

const priorityQueue = new PriorityQueue();

// Adiciona um elemento na fila prioritária
app.post('/priorityQueue/enqueue/v1', (req, res) => {
    const name = req.query.name;
    const desease = req.query.desease;
    if (desease != 'morrendo') {
        res.status(800).send('você deve entrar na fila normal, pois não atende aos requisitos de prioridade.')
    }
    if (!name) {
        res.status(400).send('O parâmetros "name" obrigatórios.');
    } else {
        priorityQueue.enqueue({
            name
        });
        res.send(`${name} adicionado à fila prioritária.`);
    }
});


// Remove um elemento da fila prioritária
app.delete('/priorityQueue/dequeue/v1', (req, res) => {
    const name = req.query.name;
    if (priorityQueue.isEmpty()) {
        res.status(400).send('A fila está vazia.');
    } else {
        priorityQueue.dequeue();
        res.send(`Elemento removido da fila prioritária: ${name}`);
    }
});

// Retorna o tamanho da fila prioritária
app.get('/priorityQueue/size/v1', (req, res) => {
    const size = priorityQueue.size();
    res.send(`Tamanho da fila prioritária: ${size}`);
});

// Retorna a posição de um elemento na fila prioritária
app.get('/priorityQueue/position/v1', (req, res) => {
    const elementName = req.query.name;

    if (!elementName) {
        res.status(400).send('O parâmetro "name" é obrigatório.');
    } else {
        const position = priorityQueue.indexOf(elementName);

        if (position === -1) {
            res.send(`O elemento ${elementName} não está na fila prioritária.`);
        } else if (position === 0) {
            res.send(`O elemento ${elementName} é o proximo a ser chamado na fila prioritária`);
        } else {
            res.send(`O elemento ${elementName} está na posição ${position + 1} da fila prioritária.`);
        }
    }
});

// Retorna todos os elementos na fila prioritária
app.get('/priorityQueue/elements/v1', (req, res) => {
    const elements = priorityQueue.toArray();

    res.send(`Elementos na fila prioritária: ${elements.map(e => `${e.name}`).join(', ')}`);
});