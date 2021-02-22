let mapOptions = {
    center: [55.785044, 37.486671],
    zoom: 8
}

let map = new L.map('map', mapOptions);  

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');  
map.addLayer(layer); 