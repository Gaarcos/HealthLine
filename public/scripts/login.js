function validateUser() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("senha").value;

    // Chame a função 'login' com os valores de login e senha
    if (login(login, password)) {
        window.location.href = '/home'
        return false;
    }

    alert("Usuário ou senha inválidos, tente novamente.");
    return false;
}

function onLoginFormSubmit(event) {
    event.preventDefault();

//     var login = document.getElementById("login").value;
//     var senha = document.getElementById("senha").value;

//     if (login(login, senha)) {
        window.location.href = '/home'
//     } else {
//         alert("Credenciais de login incorretas. Tente novamente.");
//     }
}

document.getElementById("entrar").addEventListener("click", function (event) {
    event.preventDefault();
    validateUser();
});

document.getElementById('login-form').addEventListener('click', function (event) {
    event.preventDefault();

    var email = document.getElementById('login').value;
    var password = document.getElementById('senha').value;

    fetch('http://localhost:3000/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                window.location.href = '/home.html';
            } else {
                alert('Erro de login');
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
});