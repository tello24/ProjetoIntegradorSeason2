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
});