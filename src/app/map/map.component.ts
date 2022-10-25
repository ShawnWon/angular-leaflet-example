import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import * as L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import 'leaflet-timedimension';

@Component({

selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})
export class MapComponent {


options= {
layers:[L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
opacity: 0.7,
maxZoom: 19,
detectRetina: true,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})],
zoom:14,
fullscreenControl: true,
timeDimensionControl: true,
timeDimensionControlOptions: {
  timeSliderDragUpdate: true,
  loopButton: true,
  autoPlay: true,
  playerOptions: {
    transitionTime: 1000,
    loop: true
  }
},
timeDimension: true,
center: L.latLng(1.3521,103.8189)
};


onMapReady(map: L.Map) {



const provider = new OpenStreetMapProvider();

const searchControl = GeoSearchControl({
  provider: provider,
  style:"bar"
});
map.addControl(searchControl);
}

}