


var map = L.map('map');
map.setView([44.5, 4.9], 8);


var positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);



var GeoportailFrance_parcels = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=CADASTRALPARCELS.PARCELS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 20,
	apikey: 'choisirgeoportail',
	format: 'image/png',
	style: 'bdparcellaire',
	transparent: true
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
		attribution: '<a target="_blank" href="https://www.google.com/maps">Google</a>'
});

drawnItems = L.featureGroup().addTo(map);

var baseLayers = {
	"Positron": positron
};


var overlayLayers  = {
	"Cadastre": GeoportailFrance_parcels,
	"Google Satellite" : googleSat,
	"Objets dessin&eacute;s": drawnItems
};

var control = L.control.activeLayers(baseLayers, overlayLayers,{collapsed : false}).addTo(map);


L.control.opacity(
			baseLayers
		).addTo(map);

	L.control.opacity(
					overlayLayers
				).addTo(map);




var leftSidebar = L.control.sidebar('sidebar-left', {
		position: 'left'
});
map.addControl(leftSidebar);

var rightSidebar = L.control.sidebar('sidebar-right', {
		position: 'right'
});
map.addControl(rightSidebar);

map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            }
        },
        draw: {
            polygon: {
                allowIntersection: false,
                showArea: true
            }
        }
    }));
