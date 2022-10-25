import { Component } from '@angular/core';
import * as L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import 'leaflet-timedimension';
import * as trackCycle from "../../assets/track_cycle.json";

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
zoom:15,
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

center: L.latLng(1.3,103.7880)
};
addGeoJSONLayer(map, data) {
  var icon = L.icon({
    iconUrl:
      "assets/bike.png",
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  var geoJSONLayer = L.geoJSON(data, {
    pointToLayer: function (feature, latLng) {
      if (feature.properties.hasOwnProperty("last")) {
        return new L.Marker(latLng, {
          icon: icon
        });
      }
      return L.circleMarker(latLng);
    }
  });

  var geoJSONTDLayer = L.timeDimension.layer.geoJson(geoJSONLayer, {
    updateTimeDimension: true,
    duration: "PT2M",
    updateTimeDimensionMode: "replace",
    addlastPoint: true
  });

  // Show both layers: the geoJSON layer to show the whole track
  // and the timedimension layer to show the movement of the bus
  geoJSONLayer.addTo(map);
  geoJSONTDLayer.addTo(map);
}


onMapReady(map: L.Map) {



const provider = new OpenStreetMapProvider();

const searchControl = GeoSearchControl({
  provider: provider,
  style:"bar"
});
map.addControl(searchControl);

this.addGeoJSONLayer(map, trackCycle);
}

}