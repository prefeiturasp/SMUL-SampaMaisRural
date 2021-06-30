import { Component,
  OnInit,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Subscription } from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Place, PlacesResult } from '../../models/place.model';
import { PlaceService } from '../../services/place.service';
import { ListService } from '../../services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FiltersService } from 'src/app/services/filters.service';
import { Category } from '../../models/category.model';
import { t, tInterface} from '../../utils/translate';
import { routeToSlug } from 'src/app/utils/tools';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass'],
  animations: [
    trigger('toggle', [
      state('closed', style({ transform: 'translateX(-100%)' })),
      state('open', style({ transform: 'translateX(0)' })),

      transition('open <=> closed', [
        animate('0.5s')
      ])
    ]),
  ]
})

export class PlacesComponent implements OnInit {
  places: Array<Place> = [];
  private page: number = 1;
  private totalPages: number = 1;
  listIsOpen: boolean = true;
  loading: boolean = true;
  isMobile: boolean = false;
  connectionFilter: boolean = false;
  totalCount: number = 0;
  searchTerm: string;
  filterIndex: number = 0;
  canScrollFilter: boolean;
  private placesSubscription: Subscription[] = [];
  filterQuery: string = '';
  t: tInterface = t;
  currentCategory: 'string';
  totalConnections: number = 0;
  isConnection: boolean = false;

  @Input() categoryFilters: Category[] = [];

  @HostBinding('@toggle') get onToggle() {
    return this.listIsOpen ? 'open' : 'closed';
  }

  constructor(private placeService: PlaceService,
    private listService: ListService,
    private router: Router,
    private filtersService: FiltersService,
    public route: ActivatedRoute,
    private deviceService: DeviceDetectorService) {
      this.subscribeListState();
      this.subscribePlaces();
  }

  subscribePlaces() {
    this.placesSubscription.push(this.placeService.places$
    .subscribe((results: PlacesResult) => {
      if(!results.total_count){
        this.totalCount = 0;
      } else {
        this.feedInfos(results);
      }
      this.loading = false;
    }));
  }

  feedInfos(results){
    const places = results.places;
    this.totalCount = results.total_count;
    this.totalPages = results.total_pages;
    this.page = results.current_page + 1;
    let currentPlaces = (results.current_page > 1) ? this.places : [];
    this.places = currentPlaces.concat(places);
  }

  ngOnDestroy() {
    for(let subs of this.placesSubscription){
      subs.unsubscribe();
    }
  }

  ngOnInit() {
    this.placeService.shouldResetMap();
    this.getConnectionTotal();
    this.checkIsConnection();
    this.isMobile = this.deviceService.isMobile();
    this.connectionFilter = this.route.snapshot.queryParams.connection? true : false;
  }

  ngAfterViewInit() {
    this.placesSubscription.push(this.route.queryParams
    .subscribe((params) => {
      this.filterQuery = params.filters || '';
      this.loading = true;
      this.places = [];
      this.searchTerm = params.term;
      let covid = params.covid;
      this.route.data
      .subscribe((data: any) => {
        this.currentCategory = data.category;
        this.placeService
        .resetPlace()
        .reloadAll({
          term: this.searchTerm,
          covid: covid,
          categories: [data.category],
          filters: this.filterQuery});
      }).unsubscribe();
    }));
  }

  changeFilter(){
    this.connectionFilter = !this.connectionFilter;
    this.router.navigate(['/explorar'], {queryParamsHandling: 'merge',
     queryParams: {connection: this.connectionFilter? true : null, connected_subcategories: null}});
  }

  onScroll($event: any):void {
    $event.preventDefault();
    if (this.page <= this.totalPages) {
      const el = $event.srcElement;
      if ((el.offsetHeight + el.scrollTop) >= (el.scrollHeight - 400)) {
        this.getPlacesParams();
      }
    }
  };

  getPlacesParams(){
    if (!this.loading) {
      this.loading = true;
      this.placeService.currentParams.subscribe((params) => {
        params.page = this.page;
        this.placeService.getPlaces(params);
      }).unsubscribe();
    }
  }

  subscribeListState() {
    this.listService.currentState
    .subscribe((listState: boolean) => this.listIsOpen = listState);
  }

  routeToPlace(url){
    this.placeService.setCategory(window.location.href.split('/')[3]);
    routeToSlug(this, url, {connection: this.connectionFilter ? true : null});
  }

  getConnectionTotal(){
    this.placesSubscription.push(this.placeService.totalConnectionObs.subscribe(
      total => this.totalConnections = total
    ));
  }

  onSelectedCategory(query) {
    this.filtersService.refreshFilters(query);
  }

  checkIsConnection(){
    this.placesSubscription.push(this.route.queryParams
      .subscribe(params => this.isConnection = params.connection));
  }
}
