var map = L.map('map').setView([-23.64783921317085, -46.57399714073588], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([-23.64783921317085, -46.57399714073588]).addTo(map);