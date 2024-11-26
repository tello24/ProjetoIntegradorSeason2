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
    const logo = document.getElementById('header-logo');
    const lista = document.querySelector('.lista');

    logo.addEventListener('click', function () {
        lista.classList.toggle('visible');
    });
});

const logout = () => {
    localStorage.removeItem('token');
    alert('Logout realizado com sucesso!');
    const loginLink = document.querySelector('#loginLink');
    loginLink.innerHTML = 'Login';
    const loginButton = document.querySelector('#paginaAdministracao');
    loginButton.style.display = 'none'; 
};

document.querySelector('#loginLink').addEventListener('click', function (e) {
    e.preventDefault();
    if (localStorage.getItem('token')) {
        logout();
    } else {
        window.location.href = '/login'; // Redireciona para a página de login
    }
});