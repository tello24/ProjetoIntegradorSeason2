async function prepararPagina() {
    const token = localStorage.getItem('token');
    const loginLink = document.querySelector('#loginLink');
    const loginButton = document.querySelector('#paginaAdministracao');

    if (token) {
        loginButton.style.display = 'block';  
        loginLink.innerHTML = 'Sair';
    } else {
        loginButton.style.display = 'none';
        loginLink.innerHTML = 'Login';
    }
}

var map = L.map('map').setView([-23.61995230868037, -46.66903327422016], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([-23.61995230868037, -46.66903327422016]).addTo(map);

document.addEventListener('DOMContentLoaded', function () {
    prepararPagina(); // Certifica-se de que a página foi carregada antes de chamar a função

    const logo = document.getElementById('header-logo');
    const lista = document.querySelector('.lista');

    logo.addEventListener('click', function () {
        lista.classList.toggle('visible');
    });

    const daltonismoSelect = document.getElementById('daltonismo-select');

    // Recupera a configuração de daltonismo salva
    const savedDaltonismo = localStorage.getItem('daltonismoClass');
    if (savedDaltonismo) {
        document.body.classList.add(savedDaltonismo);
        daltonismoSelect.value = savedDaltonismo;
    }

    daltonismoSelect.addEventListener('change', function() {
        document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');

        const selectedValue = daltonismoSelect.value;
        if (selectedValue) {
            document.body.classList.add(selectedValue);
            // Salva a configuração de daltonismo no localStorage
            localStorage.setItem('daltonismoClass', selectedValue);
        } else {
            // Remove a configuração se nenhuma opção estiver selecionada
            localStorage.removeItem('daltonismoClass');
        }
    });
});

const logout = () => {
    localStorage.removeItem('token');
    alert('Logout realizado com sucesso!');
    const loginLink = document.querySelector('#loginLink');
    loginLink.innerHTML = 'Login';
    const loginButton = document.querySelector('#paginaAdministracao');
    loginButton.style.display = 'none'; 
    window.location.href = ("./../pages/paginaLogin.html")
};

document.querySelector('#loginLink').addEventListener('click', function (e) {
    e.preventDefault();
    if (localStorage.getItem('token')) {
        logout();
        window.location.href("./../pages/paginaLogin.html")
    } else {
        window.location.href = './../pages/paginaLogin.html'; // Redireciona para a página de login
    }
});