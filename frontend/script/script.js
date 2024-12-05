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

let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {
    nextImage();
}, 3000);

function nextImage() {
    count++;
    if (count > 4) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true;
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


    const daltonismoSelect = document.getElementById('daltonismo-select');

    
    const savedClass = localStorage.getItem('daltonismoClass');
    if (savedClass) {
        document.body.classList.add(savedClass);
        if (daltonismoSelect) {
            daltonismoSelect.value = savedClass;
        }
    }

    if (daltonismoSelect) {
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
    }
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
        window.location.href = './../pages/paginaLogin.html'; 
    }
});