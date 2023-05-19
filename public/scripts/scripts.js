function voltarLogin() {

    window.location.href = '/login'
}


// função para validação de senha e envio de formulário de cadastro
$(document).ready(function () {
    $('#cadastroForm').submit(function (event) {
        var senha = $('input[name="senha"]').val();
        var confirmarSenha = $('input[name="confirmarSenha"]').val();
        if (senha !== confirmarSenha) {
            alert('As senhas não correspondem.');
            event.preventDefault();
        } else {
            var formData = $(this).serialize();
            $.post('/cadastro', formData, function (response) { });
            event.preventDefault();
        }
    });
});
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function () {
        this.classList.toggle('rotate');
    });
}
// função para exibir/ocultar o menu lateral na página home.html
function toggleMenu() {
    var menu = document.getElementById("menu-lateral");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// associar a função toggleMenu() ao evento de clique do botão hamburguer
var hamburgerButton = document.querySelector('.hamburger');
if (hamburgerButton) {
    hamburgerButton.addEventListener('click', toggleMenu);
}
// código para reativar botão de hambúrguer quando o menu lateral for fechado
var menu = document.getElementById("menu-lateral");
if (menu) {
    menu.addEventListener('transitionend', function () {
        hamburgerButton.disabled = false;
    });
}

//código para redirecionar a pagina de cadastro
if (document.getElementById("cadastroForm")) {
    document.getElementById("cadastroForm").addEventListener("submit", function (event) {
        event.preventDefault(); // previne o comportamento padrão de recarregar a página
        // Seu código de validação e envio do formulário
        window.location.href = "localhost:3000/login.html"; // redireciona para a página de login após o envio do formulário
    });
}
// código para destacar o link da página atual no menu lateral
$(document).ready(function () {
    var pathname = window.location.pathname;
    $('a[href="' + pathname + '"]').addClass('active');
});


function viewRecipes() {
    var mainContent = document.getElementsByClassName("main-content")[0];

    mainContent.innerHTML = `
        <h3 class="titulo-personalizado">Receitas</h3>
        <table id="recipes-table" class="table">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Medicamento</th>
                    <th>Posologia</th>
                </tr>
            </thead>
            <tbody id="recipes-body">
            </tbody>
        </table>
    `;

    var recipesBody = document.getElementById("recipes-body");
    var patientRecipes = getPatientRecipes();

    patientRecipes.forEach(function (recipe) {
        var row = `
            <tr>
                <td>${recipe.date}</td>
                <td>${recipe.medication}</td>
                <td>${recipe.posology}</td>
            </tr>
        `;
        recipesBody.innerHTML += row;
    });
    closeSidebar();
}

function getPatientRecipes() {
    // Substitua isso pelos dados das receitas do paciente logado
    return [{
        date: "01/01/2023",
        medication: "Paracetamol",
        posology: "500mg, a cada 8 horas"
    },
    {
        date: "15/01/2023",
        medication: "Ibuprofeno",
        posology: "400mg, a cada 6 horas"
    }
    ];
}


function symptoms() {
    var mainContent = document.getElementsByClassName("main-content")[0];

    mainContent.innerHTML = `
        <h3 class="titulo-personalizado">Sintomas</h3>
        <form id="symptoms-form" class="symptoms-form">
            <!-- Os sintomas serão adicionados aqui -->
        </form>
    `;

    var symptomsForm = document.getElementById("symptoms-form");
    var symptomsList = getSymptomsList();

    symptomsList.forEach(function (symptom, index) {
        var item = `
                <ul class="symptoms-ul">
                    <li>
                    <input type="checkbox" id="symptom-${index}" name="symptom" value="${symptom}">
                    <label for="symptom-${index}">${symptom}</label>
                    </li>
                </ul>
        `;
        symptomsForm.innerHTML += item;
    });
    closeSidebar();
}

function getSymptomsList() {
    // Substitua isso pelos dados dos sintomas obtidos do servidor
    return [
        "Febre",
        "Tosse seca",
        "Fadiga",
        "Dificuldade para respirar",
        "Perda de paladar",
        "Perda do olfato",
        "Dor de garganta",
        "Dor de cabeça",
        "Dores musculares",
        "Diarreia",
        "Náusea",
        "Conjuntivite",
        "Erupções cutâneas",
        "Dor abdominal",
        "Confusão mental",
        "Insuficiência renal",
        "Alterações na pressão arterial",
        "Inchaço nas pernas",
        "Convulsões",
        "Paralisia facial"
    ];
}

function chooseHospital() {
    var mainContent = document.getElementsByClassName("main-content")[0];

    mainContent.innerHTML = `
        <h3 class="titulo-personalizado">Escolher hospital</h3>
        <div id="map"></div>
    `;

    // Adicione esta linha
    setTimeout(initMap, 100);

    closeSidebar();
}

function initMap() {
    var mapElement = document.getElementById("map");

    if (!mapElement) {
        return;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        var userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        var map = new google.maps.Map(mapElement, {
            center: userLocation,
            zoom: 14
        });

        var userMarker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Sua localização"
        });

        // Adicione marcadores para os hospitais aqui
    });
}

function viewQueue() {
    var mainContent = document.getElementsByClassName("main-content")[0];

    mainContent.innerHTML = `
        <h3 class="titulo-personalizado">Andamento da fila</h3>
        <table id="fila-table" class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Posição</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody id="fila-body">
            </tbody>
        </table>
    `;

    // dados da fila de pacientes (pode ser substituído por dados obtidos do servidor)
    var fila = [{
        nome: "João",
        posicao: 1
    }];

    // seleciona o título e o corpo da tabela da fila
    var filaBody = document.getElementById("fila-body");

    // obtém a posição do paciente atual
    var pacienteAtual = "João"; // substituir pelo nome do paciente atual
    var posicaoAtual = fila.find(function (paciente) {
        return paciente.nome === pacienteAtual;
    }).posicao;

    // adiciona o título e a linha da tabela correspondente ao paciente atual
    filaBody.innerHTML = "<tr><td>" + pacienteAtual + "</td><td>" + posicaoAtual + "</td><td><button class='desistir-button'>Desistir</button></td></tr>";

    // Adicione o evento de clique ao botão "Desistir" após a criação da tabela da fila
    var desistirButton = document.getElementsByClassName("desistir-button")[0];
    desistirButton.addEventListener("click", function () {
        desistirFila();
    });

    closeSidebar();
}
// adiciona o evento de clique para o link da fila
var filaLink = document.getElementById("view-queue");
if (filaLink) {
    filaLink.addEventListener("click", function () {
        viewQueue();
    });
}

function desistirFila() {
    // Implemente a lógica para desistir da fila
    alert('Você desistiu da fila');
}


// função para exibir os dados do usuário
function user() {
    var mainContent = document.getElementsByClassName("main-content")[0];

    var userData = getUserData();

    mainContent.innerHTML = `
        <h3 class="titulo-personalizado">Dados do usuário</h3>
        <form id="user-form" class="user-form">
            <label>Nome:</label>
            <input type="text" name="nome" value="${userData.nome}" disabled><br>
            <label>Data de nascimento:</label>
            <input type="text" name="dataNascimento" value="${userData.dataNascimento}" disabled><br>
            <label>Email:</label>
            <input type="email" name="email" value="${userData.email}" disabled><br>
            <label>Telefone:</label>
            <input type="text" name="telefone" value="${userData.telefone}" disabled><br>
            <label>Endereço:</label>
            <input type="text" name="endereco" value="${userData.endereco}" disabled><br>
            <button id="edit-button" type="button">Editar</button>
        </form>
    `;

    var editButton = document.getElementById("edit-button");
    editButton.addEventListener("click", function () {
        editUserData();
    });

    closeSidebar();
}

function getUserData() {
    // Substitua isso pelos dados do usuário logado
    return {
        nome: "João Silva",
        dataNascimento: "01/01/1990",
        email: "joao@example.com",
        telefone: "(11) 99999-9999",
        endereco: "Rua Exemplo, 123"
    };
}

function editUserData() {
    var userForm = document.getElementById("user-form");
    var inputs = userForm.getElementsByTagName("input");

    // Ativa os campos de texto para edição
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }

    // Substitui o botão "Editar" por "Salvar"
    var editButton = document.getElementById("edit-button");
    editButton.innerText = "Salvar";
    editButton.removeEventListener("click", editUserData);
    editButton.addEventListener("click", function () {
        saveUserData();
    });
}

function saveUserData() {
    // Implemente a lógica para salvar os dados do usuário atualizados
    alert('Dados do usuário atualizados');
}

function logoff() {
    // Redireciona para a tela de login
    window.location.href = "login.html";
}

// adiciona o evento de clique para o link do logoff
var logoffLink = document.getElementById("logoff");
if (logoffLink) {
    logoffLink.addEventListener("click", function () {
        logoff();
    });
}
 
if (document.getElementById("logoff")) {
    document.getElementById("logoff").addEventListener("click", logoff);
    document.getElementById("user").addEventListener("click", user);
    document.getElementById("view-recipes").addEventListener("click", viewRecipes);
    document.getElementById("symptoms").addEventListener("click", symptoms);
    document.getElementById("choose-hospital").addEventListener("click", chooseHospital);
    document.getElementById("view-queue").addEventListener("click", viewQueue);
    document.getElementById("user").addEventListener("click", user);
}

function closeSidebar() {
    var menuLateral = document.getElementById("menu-lateral");
    menuLateral.style.display = "none";
}

if (document.getElementById("cadastroForm")) {
    document.getElementById("cadastroForm").addEventListener("submit", function (e) {
        e.preventDefault(); // impede a submissão do formulário

        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem. Por favor, insira novamente.");
            return; // interrompe a execução da função se as senhas não coincidirem
        }

        const formData = new FormData(this);


        fetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {

                if (data.message === 'Cadastro realizado com sucesso') {

                    window.location.href = '/login';
                } else {

                }
            })
            .catch(error => console.error(error));
    });
}
