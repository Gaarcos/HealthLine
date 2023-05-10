//Retorna as receitas de um usuário
app.get('/getPrescription/v1', (req, res) => {
    const {
        email
    } = req.body;
    // Verifica se o email e a senha são válidos
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({
            message: 'Email inválido'
        });
    }

    res.json({
        receita: user.prescriptions
    });

});

app.post('/sendPrescription/v1', (req, res) => {
    const {
        email,
        prescription
    } = req.body;

    // Verifica se o email e a senha são válidos
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({
            message: 'Email inválido'
        });
    }
    user.prescriptions = prescription;

    // Retorna uma mensagem de sucesso
    res.send(`Prescrição adicionada com sucesso: ${user.prescriptions}`);
})
