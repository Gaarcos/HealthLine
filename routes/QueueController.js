const express = require("express");
const app = express();

// Adiciona um elemento na fila
app.post('/queue/enqueue/v1', (req, res) => {
    const name = req.query.name;

    if (!name) {
        res.status(400).send('O parâmetros "name" obrigatórios.');
    } else {
        queue.enqueue({
            name
        });
        res.send(`Elemento com nome ${name} adicionado à fila.`);
    }
});
// Remove um elemento da fila
app.delete('/queue/dequeue/v1', (req, res) => {
    const name = req.query.name;
    if (queue.isEmpty()) {
        res.status(400).send('A fila está vazia.');
    } else {
        queue.dequeue();

        res.send(`Elemento removido da fila: ${name}`);
    }
});

// Retorna o tamanho da fila
app.get('/queue/size/v1', (req, res) => {
    const size = queue.size();

    res.send(`Tamanho da fila: ${size}`);
});

// Retorna a posição de um elemento na fila
app.get('/queue/position/v1', (req, res) => {
    const elementName = req.query.name;

    if (!elementName) {
        res.status(400).send('O parâmetro "name" é obrigatório.');
    } else {
        const position = queue.indexOf(elementName);

        if (position === -1) {
            res.send(`O elemento ${elementName} não está na fila.`);
        } else if (position === 0) {
            res.send(`O elemento ${elementName} é o proximo a ser chamado`);
        } else {
            res.send(`O elemento ${elementName} está na posição ${position + 1} da fila.`);
        }
    }
});


// Retorna todos os elementos na fila
app.get('/queue/elements/v1', (req, res) => {
    const elements = queue.toArray();

    res.send(`Elementos na fila: ${elements.map(e => `${e.name}`).join(', ')}`);
});


