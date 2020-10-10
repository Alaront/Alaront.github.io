let mapOptions = {
    center: [15, 0],
    zoom: 2
}

let map = new L.map('map', mapOptions)

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

map.addLayer(layer)

let mark = () => {
    let latitude = [17.385044, 41.385044, 25, -10, -1, -29, 2, -12, 40, 60]
    let longitude = [78.486671, 43.486671, 45, -55, 24, 150, -75, -75, -100, 100]
    let text = ['10.324', '8.771', '5.431', '8.560', '431', '4.123', '8.135', '3.137', '3.984', '1.231']

    for (let i = 0; i < 10; i++) {
        let marker = new L.Marker([latitude[i], longitude[i]])
        marker.bindPopup(text[i]).openPopup()
        marker.addTo(map)
    }

    let iconOptions = {
        iconUrl: 'img/icon.png',
        iconSize: [30, 30]
    }
    // Creating a custom icon
    let customIcon = L.icon(iconOptions);

    // Options for the marker
    let markerOptions = {
        clickable: true,
        draggable: true,
        icon: customIcon
    }

    let marker3 = L.marker([-20, -58], markerOptions);
    marker3.bindPopup('Тут мы').openPopup();
    marker3.addTo(map); //передали в карту
}
mark();