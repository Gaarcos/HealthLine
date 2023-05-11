document.getElementById('logar').addEventListener('click', function (event) {
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