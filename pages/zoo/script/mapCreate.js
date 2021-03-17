let mapOptions = {
    center: [-8.5, 32],
    zoom: 4
}

let map = new L.map('mapid', mapOptions)

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

map.addLayer(layer)

let mark = () => {
    let iconOptions = {
        iconUrl: 'img/logo.png',
        iconSize: [40, 40]
    }
    // Creating a custom icon
    let customIcon = L.icon(iconOptions);

    // Options for the marker
    let markerOptions = {
        clickable: true,
        draggable: true,
        icon: customIcon
    }

    let marker3 = L.marker([-8.0, 32], markerOptions);
    marker3.bindPopup('Маса́и-Ма́ра').openPopup();
    marker3.addTo(map); 
}
mark();