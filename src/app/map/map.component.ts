import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, marker, icon, MapOptions, tileLayer, latLng } from 'leaflet';
import { Loader } from '@googlemaps/js-api-loader';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({

selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

@Output() map$: EventEmitter<Map> = new EventEmitter;

@Output() zoom$: EventEmitter<number> = new EventEmitter;
@Input() options: MapOptions= {
layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
opacity: 0.7,
maxZoom: 19,
detectRetina: true,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})],
zoom:10,
center:latLng(1.3521,103.8198)
};
public map: Map;
public zoom: number;

constructor() { }

ngOnInit(): void {

}

ngOnDestroy() {

this.map.clearAllEventListeners;
this.map.remove();
};
onMapReady(map: Map) {
this.map = map;
this.map$.emit(map);
this.zoom = map.getZoom();
this.zoom$.emit(this.zoom);

const provider = new OpenStreetMapProvider();

const searchControl = GeoSearchControl({
  provider: provider,
  style:"bar"
});
map.addControl(searchControl);
}

}