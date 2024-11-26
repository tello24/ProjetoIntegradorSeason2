async function prepararPagina() {
    const token = localStorage.getItem("token")

    if (token) {
        const loginButton = document.querySelector('#paginaAdministracao')
        loginButton.style.display = 'block' 
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