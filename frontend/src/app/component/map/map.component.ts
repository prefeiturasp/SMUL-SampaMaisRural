import { Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import * as L from 'leaflet';
import '@elfalem/leaflet-curve';
import * as LCluster from 'leaflet.markercluster'
import { Place } from '../../models/place.model';
import { Category } from '../../models/category.model';
import { capitalize, zoomControl, getReferencePoint, routeToSlug } from '../../utils/tools';
import { PlaceService } from '../../services/place.service';
import { GeolocationService } from '../../services/geolocation.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, ActivatedRoute } from '@angular/router';
import { MapService } from '../../services/map.service';
import { ListService } from '../../services/list.service';
import { Subscription } from 'rxjs';
import { FiltersService } from 'src/app/services/filters.service';
import { t } from '../../utils/translate';
import { shapeStyles } from './shape-configs';
import { Shapes } from '../../models/shapes.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit {
  place: Place = null;
  private buttonBottom: number = 36;
  private map;
  private bigIconSize: Array<number> = [68, 76];
  private smallIconSize: Array<number> = [49, 56];
  private listWidthSubscription: Subscription;
  private mapSubscription: Subscription;
  private currentPlace$: Subscription;
  private resetMap$: Subscription;
  private navWidth: number = 0;
  private mapIsLoaded: boolean = false;
  private maxZoom: number = 17;
  private minZoom: number = 8;
  private initialZoom: number = 12;
  parksLoaded: boolean = false;
  isMobile: boolean = false;
  private clusters: Array<LCluster.MarkerClusterGroup> = [];
  private paramsSubscription: Subscription;
  private initialBounds: Array<Array<number>> =  [[-23.304424,-47.000574],
    [-23.251441,-46.390426],
  [-23.883326,-46.437149],
  [-24.070907,-46.843506]]
  shapes: any = [];
  styleButton: object;
  styleButtonGeo: object;
  lines: any = [];
  connecteds: Array<String> = [];
  nativeLabels: Array<string> = [];
  shapesCreated: boolean = false;

  @ViewChild('placeCard', {static: false}) placeCard: ElementRef;

  @Output() placeMouseOver = new EventEmitter();
  @Input() hideControl: boolean = false;
  @Input() pageName: string;
  @Input() mapCenter: Array<number> = [-23.827, -46.727]; // Parelheiros

  subscribeLocations() {
    this.placeService.locations$.subscribe((categories: Category[]) => {
      this.populateMap(categories);
    });
  }

  constructor(private placeService: PlaceService,
              private deviceService: DeviceDetectorService,
              private mapService: MapService,
              private router: Router,
              private elRef: ElementRef,
              private route: ActivatedRoute,
              private listService: ListService,
              private geoLocationService: GeolocationService,
              private filterService: FiltersService,
              private cdr: ChangeDetectorRef) {
                this.subscribeMapState();
                this.subscribeSlug(this.placeService);
                this.subscribeLocations();
                this.isMobile = this.deviceService.isMobile();
                if(this.isMobile){
                  this.getButtonPosition();
                }
              }


  subscribeMapState() {
    this.resetMap$ = this.placeService.resetMap$
      .subscribe((resetMap: boolean) => {
      if (resetMap) {
        this.resetMap(this.map);
      }
    });
  }

  getCenter() {
    // TODO pass map as  parameter
    const isMobile = this.deviceService.isMobile();
    const map = this.map;
    const mapBounds = map.getBounds();
    const topStart = map.project(mapBounds.getNorthWest());
    const bottomStart = map.project(mapBounds.getSouthWest());
    this.navWidth = (this.elRef.nativeElement.clientWidth * 37 )/100;
    topStart.x += this.navWidth;
    bottomStart.x += this.navWidth;
    const topLeft = !isMobile ? (map.unproject(topStart)) : mapBounds.getNorthWest();
    const bottomLeft = !isMobile ? (map.unproject(bottomStart)) : mapBounds.getSouthWest();
    const topRight = mapBounds.getNorthEast();
    const bottomRight = mapBounds.getSouthEast();
    mapBounds._southWest = this.middleCoordinate(bottomRight, bottomLeft);
    mapBounds._northEast = this.middleCoordinate(topRight, topLeft);
    let center = mapBounds.getCenter();
    center = { lon: center.lng, lat: center.lat };
    return center;
  }

  middleCoordinate(coord1, coord2){
    let result = {lat: (coord1.lat + coord2.lat) /2, lng: (coord1.lng + coord2.lng) /2}
    return result;
  }

  subscribeParams() {
    if(this.pageName !== t.url.home){
      this.placeService.currentParams
      .subscribe((params) => {
        if (params.center !== this.getCenter()) {
          params.center = this.getCenter();
          this.placeService.updateQuery(params);
        };
      }).unsubscribe();
    }
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.initMap();
    this.subscribeParams();
  }

  initMap(): void {
    if(!this.map){
      this.map = L.map('map', {
        zoom: this.initialZoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        zoomControl: false
      });

      this.onEvent('zoomend');
      this.onEvent('dragend');

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      tiles.addTo(this.map);
      if (!this.hideControl) this.map.addControl(zoomControl(this.deviceService.isMobile()));
      this.map.fitBounds(this.initialBounds, { paddingTopLeft: [this.navWidth, 0] });
    }
    if(this.pageName !== t.url.home && !this.shapesCreated){
      this.getShapes('regions');
      this.createPanes();
    }
  }

  ngOnDestroy() {
    this.currentPlace$.unsubscribe();
    this.resetMap$.unsubscribe();

    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }

    if(this.mapSubscription){
      this.mapSubscription.unsubscribe();
    }

    if (this.listWidthSubscription) {
      this.listWidthSubscription.unsubscribe();
    }
  }

  subscribeSlug(service: PlaceService) {
    this.currentPlace$ = service.currentPlace
    .subscribe((place: Place) => {
      this.place = place;
      if (place ) {
        this.flyToPlace(place, this.map);
        this.onHighlight(place);
      }
    });
  }

  flyWhenLoaded(){
    if (this.place) {
      if (this.mapIsLoaded) {
        this.flyToPlace(this.place, this.map);
      }
    }
  }

  private onHighlight(place: Place): void {
    this.checkMarker(place);
    this.checkCluster(place);
    this.navigateToPlacePosition(place);
  }

  navigateToPlacePosition(place){
    if(this.route.snapshot['_routerState'].url.includes(t.place)){
      this.flyToPlace(place);
    }
  }

  private checkCluster(place, ids: object = {}): void {
    const self = this;
    self.map.eachLayer(function(layer) {
      if (layer.options.isCluster) {
        layer.eachLayer(function(marker) {
          if(place){
            self.highLightCluster(place, marker);
          }
          setTimeout(function() {
            self.checkIfMarkerMatch(ids, marker, layer);
          }, 500)
        })
      layer.refreshClusters();
      }
    });
  }

  getMarkersCoords(id, coords1, ids){
    let self = this;
    this.map.eachLayer(function(layer) {
      if (layer.options.isCluster) {
        layer.eachLayer(function(marker) {
          self.defineFSecondPoint(id, layer, marker, ids, coords1);
        })
      }
    });
  }

  checkIfMarkerMatch(ids, marker, layer){
    if(ids && ids[marker.options.place_id]){
      this.defineFirstPoint(marker.options.place_id, ids, marker, layer);
    }
  }

  defineFirstPoint(id, ids, marker, layer){
    let visible = layer.getVisibleParent(marker);
    if(visible && visible._bounds){
      this.getMarkersCoords(id, this.calculateCoords(visible.getBounds()), ids[marker.options.place_id])
    } else {
      this.getMarkersCoords(id, marker._latlng, ids[marker.options.place_id])
    }
  }

  highLightCluster(place, marker){
      let iconSize = this.smallIconSize;
      marker.options.highlight = (marker.options.place_id == place.id && (place.highlight))
      if(marker.options.highlight){
        iconSize = this.bigIconSize;
      }
      marker.setIcon(this.iconPath(marker.options.icon.options.iconUrl, iconSize));
  }

  private checkMarker(place: Place, fromList: boolean = false): void {
    const self = this;
    this.map.eachLayer(function(layer) {
      if(place){
        self.highlightMarker(layer, place, self, fromList);
      }
    });
  }

  defineFSecondPoint(id, layer, marker, ids, coords1){
    let self = this;
    let visible = layer.getVisibleParent(marker);
    if(visible && visible._bounds){
      self.verifyConnection(id, marker, ids, coords1, self.calculateCoords(visible._bounds))
    } else {
      self.verifyConnection(id, marker, ids, coords1, marker._latlng)
    }
  }

  calculateCoords(bounds){
    const x = (bounds._northEast.lat + bounds._southWest.lat)/2;
    const y = (bounds._northEast.lng + bounds._southWest.lng)/2;
    const zoom = this.map.getZoom();
    return {lat: zoom === 11? x - 0.004: x, lng: zoom === 11? y + 0.01: y}
  }

  verifyConnection(id, layer, ids, coords1, coords2 = null){
    if(ids.includes(layer.options.place_id) && !this.checkIfRepeatLine(id, layer.options.place_id)){
      this.connecteds.push(id + '/' + layer.options.place_id);
      coords1 = [coords1.lat, coords1.lng];
      coords2 = [coords2.lat, coords2.lng];
      this.drawLines([coords1, getReferencePoint(coords1, coords2), coords2])
    }
  }

  checkIfRepeatLine(id1, id2){
    return this.connecteds.includes(id1 + '/' + id2) || this.connecteds.includes(id2 + '/' + id1);
  }

  highlightMarker(layer, place, self, fromList){
    let icon = self.smallIconSize;
    if (layer.options.place_id === place.id) {
      if (place.highlight) {
        icon = self.bigIconSize;
        if (!this.deviceService.isMobile) {
          layer.bindPopup(self.placePopUp(place)).openPopup()
          self.openPopup(layer);
        }
      } else {
        layer.closePopup();
      }
      layer.setIcon(self.iconPath(place.icon, icon));
    }
  }

  flyToPlace(place: Place, map = this.map, zoom = this.map.getZoom()) {
    if (place.lat && place.lon) {
      // TODO remove
      place.highlight = true;

      const offsetIndex = (!this.deviceService.isMobile() ? (map.getSize().x * 0.35) : 0);
      const offsetX = offsetIndex / 2,
        latlng = L.latLng(this.formatCoords(place)),
        targetPoint = map.project(latlng, zoom).subtract([offsetX, 0]),
        targetLatLng = map.unproject(targetPoint, zoom);
      map.setView(targetLatLng, zoom);
    }
  }

  offset(map = this.map) {
    return (!this.deviceService.isMobile() ? (map.getSize().x * -0.35) : 0);
  }

  iconPath(icon: string, iconSize: Array<number>) {
    return L.icon({ iconSize: iconSize, iconUrl: icon });
  }

  marker(coords: Array<number>, icon: Object, place: Place, index: number) {
    const self = this;
    const marker = new L.marker(this.formatCoords(place),
                                 { icon: icon,
                                   isMarker:  true,
                                   name: place.name,
                                   subcategory_list: place.subcategory_list,
                                   category: place.type,
                                   place_id: place.id});
    marker.on('click', function(e) { self.onClick(place) });
    marker.on('mouseover', function(e) { self.onMouse(e, place) });
    marker.on('mouseout', function(e) { self.onMouse(e, place) });
    return marker;
  }

  private currentIcon(place: Place, eventType: string = '') {
    let iconSize = this.smallIconSize;
    if (eventType === 'mouseover' || this.isCurrentPlace(place)) {
      iconSize = this.bigIconSize;
    }
    return this.iconPath(place.icon, iconSize)
  }

  private openPopup(marker: any) {
    marker
    .bindPopup(this.placePopUp(marker))
    .openPopup()
  }

  private onMouse(e: any, place: Place) {
    const marker = e.target;
    if (e.type === 'mouseover') {
      marker
      .bindPopup(this.placePopUp(place))
      .openPopup()
      this.openPopup(marker);
    } else {
      marker.closePopup();
    }
    marker.setIcon(this.currentIcon(place, e.type));
  }

  formatCoords(place: Place) {
    return [place.lat, place.lon];
  }

  onEvent(event: string) {
    const self = this;
    self.map.on(event, function(e) {
      if(event === "zoomend"){
        self.definePaneVisibilities();
      }
      self.reloadList(self);
    });
  }

  reloadList(self: MapComponent) {
    if  (this.mapIsLoaded) {
      self.placeService
      .currentParams.subscribe((params) => {
        params.center = self.getCenter();
        params.filters = params.filters? params.filters : this.route.snapshot.queryParams.filters;
        this.placeService.getPlaces(params);
      }).unsubscribe();
    }
  }

  isCurrentPlace(place: Place) {
    return (this.place && this.place.id === place.id)
  }

  createCluster(categoryName: string, markers: Array<any>) {
    const cluster = new LCluster.MarkerClusterGroup({
      showCoverageOnHover: false,
      category: categoryName,
      isCluster: true,
      disableClusteringAtZoom: 13,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: function(cluster) {
        let highlightClass = categoryName;
        cluster.getAllChildMarkers().map((marker) => {
          if (marker.options.highlight) {
            highlightClass = 'highlight-marker highlight-marker-' + categoryName;
          }
        })
        return L.divIcon({ html: "<div class='markers-group " + highlightClass + ' '+ categoryName + "-marker'><b>" + cluster.getChildCount() + "</b></div>" });
      }
    });
    cluster.addLayer(markers);
    return cluster;
  }

  createMarker(place: Place, index: number) {
    const self = this;
    return self.marker(self.formatCoords(place), self.currentIcon(place), place, index);
  }

  createMarkers(places: Array<Place>) {
    const self = this;
    const markers = L.markerClusterGroup();
    places.map((place, index) => {
      markers.addLayer(self.createMarker(place, index));
    });
    return markers;
  }

  addCluster(cluster: LCluster.MarkerClusterGroup) {
    this.clusters.push(cluster);
  }

  addClustersToMap(cluster) {
    this.map.addLayer(cluster);
  }

  resetMap(map) {
    map.eachLayer(function(layer) {
      if (layer.options.isCluster) {
        map.removeLayer(layer);
      }
    });
  }

  populateMap(categories: Array<Category>): void {
    this.resetMap(this.map);
    this.mapService.setButtonBottom(36);
    categories.filter((category) => category.places).map((category: Category) => {
      const markers = this.createMarkers(category.places);
      const cluster = this.createCluster(category.name, markers);
      this.addClustersToMap(cluster);
    });

    if (!this.mapIsLoaded) {
      this.flyToBounds(this.map);
      this.reloadList(this);
    }

    if (this.place)  {
      this.flyToPlace(this.place, this.map);
    }
    this.mapIsLoaded = true;
    this.getConnections();
  }

  flyToUserLocation(){
     this.geoLocationService.getCurrentLocation()
    .then((coords: Array<number>) => {
      this.map.setView(coords, this.maxZoom - 1);
    });

  }

  flyToBounds(map = this.map) {
    let bounds =  L.latLngBounds(this.shapes[0]? this.shapes[0].getBounds() :  this.initialBounds);
    map.fitBounds(bounds, { paddingBottomRight: [this.offset(map), 0] })
  }

  getButtonPosition(){
    this.mapSubscription = this.mapService.buttonBottomObs.subscribe(bottom => {
      this.styleButton = {'bottom' : 'calc(98px + ' + bottom + 'px)'};
      this.styleButtonGeo = {'bottom' : 'calc(50px + ' + bottom + 'px)'};
    });
  }

  placePopUp(place) {
    if(place.name){
      let content = '<div class="marker-title">' + capitalize(place.name);
      content += this.popupSubCategory(place);
      content += this.popupProducts(place);
      content += this.popupActivities(place);
      content += this.popupTags(place.tag_list);
      content += this.popupTags(place.qualification_list);
      return content += '</div>';
    }
  }

  popupSubCategory(place){
      return place.subcategory_list? '<p class="marker-subcategory ' + place.type + '">' + place.subcategory_list.join(' • ') + '</p>' : '';
  }

  popupProducts(place){
    return place.product_list? '<div class="marker-kind">' + place.product_list.join(' • ') + '</div>' : '';
  }

  popupActivities(place){
      return place.tags_from_subcategories? '<div class="marker-kind">' + place.tags_from_subcategories.join(' • ') + '</div>' : '';
  }

  popupTags(tags){
    let content = '';
    if (tags) {
      content += '<div class="marker-tags">';
      for(let tag of tags){
        content += '<span class="marker-tag">' + tag + '</span>';
      }
      return content + '</div>';
    } else{
      return '';
    }
  }

  private onClick(place) {
    const isMobile = this.deviceService.isMobile();
    this.placeService.setCategory(window.location.href.split('/')[3]);
    this.flyToPlace(place, this.map);
    if (isMobile) {
      this.place = place;
      const self = this;
      setTimeout(function() {
        const placeCard = self.placeCard.nativeElement;
        self.buttonBottom = placeCard.offsetHeight + 30;
        self.mapService.setButtonBottom(self.buttonBottom);
        self.onHighlight(place);
      }, 100)
    } else {
      let params: any =  {};
      const queryParams = this.route.snapshot.queryParams;
      if (queryParams.connection) {
        params.connection = queryParams.connection;
      }
      if (queryParams.slug) {
        params.slug = [place.slug].concat(place.related_partner_slugs)
      }
      routeToSlug(this, '/lugar/' + place.slug, params)
    }
  }

  mapChanged(e: any): void {
    this.mapService.mapChanged(e);
  }

  async getShapes(type: string){
    this.shapesCreated = true;
    let self = this;
    this.nativeLabels = [];
    await this.mapService.getShapes(type).subscribe((shapes: Shapes) =>{
      this.shapes.push(L.geoJSON(shapes, {
        style: function(feature: Shapes) {
            return self.getPaneStyle(feature);
        },
        onEachFeature: function (feature: Shapes, layer) {
          self.panePopups(feature, layer);
        }
      }).addTo(this.map));
    });
    this.definePaneVisibilities();
  }

  getPaneStyle(feature: Shapes){
    switch (feature.properties.kind) {
      case 'region': case 'conservation': return shapeStyles['none'];
      case 'park': return shapeStyles['park'];
      case 'native': return shapeStyles['native-lands'];
      case 'rural_urban': return feature.properties.name === t.rural_zone? shapeStyles['rural-zone'] : shapeStyles['none'];
      case 'city': return shapeStyles['city'];
    }
  }

  panePopups(feature: Shapes, layer){
    let kind = feature.properties.kind;
    if(feature.properties.name && kind === 'park'){
      layer.bindPopup('<div class="pane-name">'+feature.properties.name+'</div>');
      this.popupFunctions(layer);
    }
    else if(this.checkRuralZones(feature.properties.cd_perimet)){
      layer.bindTooltip("Zona Rural", {className: 'rural-tooltip', permanent: true}).openTooltip();
    } else if(this.checkNativeLands(feature.properties.name, feature.properties.status)){
      layer.bindTooltip("Terra Indígena <br />" + feature.properties.name, {className: 'native-tooltip', permanent: true}).openTooltip();
      this.nativeLabels.push(feature.properties.name);
    };
  }

  popupFunctions(layer){
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
      this.closePopup();
    });
  }

  checkRuralZones(value){
    return ['3723', '3614', '3834'].includes(value);
  }

  checkNativeLands(name, status){
    return ['Tenonde Pora', 'Jaragua'].includes(name) && status.toLowerCase() === 'declarada' && !this.nativeLabels.includes(name);
  }

  createPanes(){
    let panes = Object.keys(shapeStyles);
    for(let pane of panes){
      this.map.createPane(pane);
    }
    this.map.getPane('native-lands').style.zIndex = 570;
    this.map.getPane('park').style.zIndex = 590;
    this.map.getPane('rural-zone').style.zIndex = 560;
    this.map.getPane('city').style.zIndex = 580;
  }

  definePaneVisibilities(){
    let zoomLevel = this.map.getZoom();
    let showFilled = zoomLevel < 12? 'block' : 'none';
    let showParks = zoomLevel > 13? 'block' : 'none';
    if(this.map.getPane('native-lands')){
      this.map.getPane('native-lands').style.display = showFilled;
      this.map.getPane('rural-zone').style.display = showFilled;
      this.map.getPane('park').style.display = showParks;
    }

    if(zoomLevel > 13 && !this.parksLoaded){
      this.getShapes('parks');
      this.parksLoaded = true;
    }

    this.getConnections();
    this.hideOrShowToolTip(zoomLevel);
  }

  hideOrShowToolTip(zoomLevel){
    let self = this;
    this.map.eachLayer(function(l) {
      var toolTip = l.getTooltip();
      if (toolTip && zoomLevel >= 12) {
        self.map.closeTooltip(toolTip);
      } else if(toolTip && zoomLevel < 12){
        self.map.openTooltip(toolTip);
      }
    });
  }

  async getConnections(){
    let response = await this.mapService.getConnections().toPromise();
    if(response){
      this.placeService.setTotalConnection(response['total_count']);
      this.initConnections(response['places']);
    }
  }

  initConnections(ids){
    this.removeLines();
    this.connecteds = [];
    if(this.route.snapshot.queryParams.connection && ids){
      let idsArr = {};
      for(let id of ids){
        idsArr[Object.keys(id)[0]] = id[Object.keys(id)[0]];
      }
      this.lines = [];
      this.checkCluster(null, idsArr);
    }
  }

  defineLineVisibility(){
    if(this.map.getPane('line')){
      this.map.getPane('line').style.display = this.map.getZoom() < 9? 'none' : 'block';
      this.map.getPane('line').style.zIndex = 590;
    }
  }

  removeLines(){
    for(let line of this.lines){
      this.map.removeLayer(line);
    }
  }

  drawLines(coords){
    if(!this.map.getPane('line')){
      this.map.createPane('line')
    }
    this.lines.push(L.curve(['M', coords[0], 'C',  coords[0], coords[1], coords[2]],
      {color:'#3F993F',fill:false, pane: 'line', weight: 2}).addTo(this.map));
    this.defineLineVisibility();
  }

  ngAfterViewChecked() {
    this.buttonBottom = this.buttonBottom;
    this.cdr.detectChanges();
  }
}
