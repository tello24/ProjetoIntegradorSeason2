const protocolo = 'http://';
const baseURL = 'localhost:8000';
const loginEndPoint = '/login';

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

const verificaLogin = async () => {
    const loginEmailInput = document.getElementById('email');
    const loginEmail = loginEmailInput.value;

    const loginSenhaInput = document.getElementById('senha');
    const loginSenha = loginSenhaInput.value;

    if (loginEmail && loginSenha) {
        try {
            const URLCompleta = `${protocolo}${baseURL}${loginEndPoint}`;
            const response = await axios.post(URLCompleta, {
                email: loginEmail,
                senha: loginSenha,
            });

            localStorage.setItem('token', response.data.token);

            loginEmailInput.value = '';
            loginSenhaInput.value = '';

            alert('Login realizado com sucesso!');
            const loginButton = document.querySelector('#paginaAdministracao');
            loginButton.style.display = 'block';
            window.location.href = "./../pages/paginaAdministração.html"
            const loginLink = document.querySelector('#loginLink');
            loginLink.innerHTML = 'Sair';
        } catch (e) {
            alert('Falha na autenticação');
        }
    } else {
        alert('Preencha todos os campos!!!');
    }
};

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
        window.location.href = './../pages/paginaLogin.html'; 
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const logo = document.getElementById('header-logo');
    const lista = document.querySelector('.lista');

    logo.addEventListener('click', function () {
        lista.classList.toggle('visible');
    });

    prepararPagina(); 

    const daltonismoSelect = document.getElementById('daltonismo-select');

    
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
        
            localStorage.setItem('daltonismoClass', selectedValue);
        } else {
            
            localStorage.removeItem('daltonismoClass');
        }
    });
});