var map = L.map('map').setView([-23.61995230868037, -46.66903327422016], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([-23.61995230868037, -46.66903327422016]).addTo(map);