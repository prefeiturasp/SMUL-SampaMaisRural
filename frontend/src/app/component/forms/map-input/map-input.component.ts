import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { t, translateCat } from '../../../utils/translate';
import { zoomControl } from '../../../utils/tools';

@Component({
  selector: 'map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.sass']
})
export class MapInputComponent implements OnInit {

  @Input() category: string;
  @Input() address: string;
  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  categoryName: string;
  private maxZoom: number = 18;
  private initialZoom: number = 14;
  private minZoom: number = 8;
  private map;
  private coords: object = {lat: -23.550831,lon: -46.633911};
  private center: Array<number> = [-23.550831,-46.633911];
  invalid: boolean = false;
  timer: any;
  marker: any;
  list: any;

  constructor(private deviceService: DeviceDetectorService,
    private geoLocationService: GeolocationService) { }

  ngOnInit() {
    this.loadMap();
    this.defineCoods(this.coords['lat'] , this.coords['lon'], this.initialZoom);
    this.setCategory();
    this.setMarker();
    this.onClick();
    this.getLocation();
  }

  getLocation(){
    this.geoLocationService.getCurrentLocation()
    .then((coords: Array<number>) => {
      if (coords && this.coords !== coords) {
        this.coords = {lat: coords[0], lon: coords[1]};
        this.defineCoods(coords[0] , coords[1], this.initialZoom);
        this.setMarkerPosition(coords[0] , coords[1]);
      }
    });
  }

  setCategory(){
    this.categoryName = this.categoryName || translateCat(this.category);
  }

  setMarker(){
   let icon = L.icon({
      iconUrl: '/assets/svgs/'+this.categoryName.toLowerCase() + '-pin.svg',
      iconSize: [68, 125], 
      iconAnchor: [34, 90],
      shadowUrl: null
    });
    this.marker = new L.marker(this.coords, {icon: icon}).addTo(this.map);
  }

  async getCoordsFromAddress(){
    this.list = [];
    this.invalid = false;
    if(this.address){
      let result: any = await this.geoLocationService.getCoords(this.address).toPromise();
      this.moveMapAndCoords(result[0]);
      if(result.length > 1){this.list = result;}
    }
  }

  moveMapAndCoords(result){
    this.list = [];
    if(result){
      let coords = [result.lat, result.lon];
      this.defineCoods(coords[0], coords[1]);
      this.setMarkerPosition(coords[0], coords[1]);
    } else {
      this.emptyCoords();
      this.setMarkerPosition(this.center[0],this.center[1]);
    }
  }

  setMarkerPosition(coord1, coord2){
    this.marker.setLatLng({lat: coord1, lon: coord2});   
  }

  defineCoods(coord1, coord2, zoomLevel = this.maxZoom - 1){
    this.coords = {lat: parseFloat(coord1), lon: parseFloat(coord2)};
    this.map.setView(new L.LatLng(coord1, coord2), zoomLevel);
    this.inputChange();
  }

  emptyCoords(){
    this.map.setView(new L.LatLng(this.center[0], this.center[1]), this.maxZoom - 1);
    this.invalid = true;
    this.coords = {lat: this.center[0], lon: this.center[1]};
    this.inputChange();
  }

  loadMap(){
    this.map = L.map('map', {
      zoom: this.initialZoom,
      center: [this.coords['lat'], this.coords['lon']],
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    tiles.addTo(this.map);
    this.map.addControl(zoomControl(this.deviceService.isMobile()));
  }

  onClick(){
    let self = this;
    this.map.on('click', function(e){
      self.marker.setLatLng(e.latlng);
      self.coords = {lat: e.latlng.lat, lon: e.latlng.lng};
      self.invalid = false;
      self.inputChange();
    });
  }

  ngOnChanges(){
    let self = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      self.getCoordsFromAddress();
    }, 500);
  }

  inputChange(){
    this.sendValue.emit(this.coords);
  }

}
