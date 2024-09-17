// Abrir e fechar menu para mobile
const menu = document.querySelector('.nav-links');
const toggleButton = document.querySelector('.menu-toggle');

toggleButton.addEventListener('click', () => {
    menu.classList.toggle('active');
});
