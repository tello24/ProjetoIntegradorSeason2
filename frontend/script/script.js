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

let count = 1
document.getElementById("radio1").checked = true

setInterval(function() {
    nextImage()
}, 3000)

function nextImage() {
    count ++
    if( count > 4 ) {
        count = 1
    }

    document.getElementById("radio" + count).checked = true
}

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.getElementById('header-logo');
    const lista = document.querySelector('.lista');

    logo.addEventListener('click', function() {
        lista.classList.toggle('visible');
    });
    
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');
    let popupTimeout;

    function showPopup() {
        popup.style.display = 'block';
        popupTimeout = setTimeout(hidePopup, 15000); 
    }

    function hidePopup() {
        popup.style.display = 'none';
        clearTimeout(popupTimeout);
    }

    closePopupBtn.addEventListener('click', hidePopup);

    setTimeout(showPopup, 1000);
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
        window.location.href = '/frontend/pages/paginaLogin.html'; // Redireciona para a página de login
    }
});