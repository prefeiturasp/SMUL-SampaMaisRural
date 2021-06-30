import { Component, OnInit, Input, ElementRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MapService } from 'src/app/services/map.service';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { FiltersService } from 'src/app/services/filters.service';
import { Filters } from '../../models/filters.model';
import { formatFilter } from '../../utils/tools';
import { ListService } from 'src/app/services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { t } from '../../utils/translate';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass']
})
export class FiltersComponent implements OnInit {

  @Input() listIsOpen: boolean;
  @ViewChild('filtersElement', {static: false}) filtersElement: ElementRef;

  isOpenFilters: boolean = false;
  isMobile: boolean = false;
  buttonBottom: number = 36;
  loading = true;
  catAreaWidth: number = 200;
  isConnectonsActive: boolean = false;
  styleButton: object = {};
  styleButtonCovid: object = {};
  filters: Filters = { categories: [] };
  private filtersSubscription: Subscription[] = [];
  filterQuery: string = '';
  formQuery: string = '';
  totalResultsFiltered: number;
  selectedCategories: string[] = [];
  openedCategories: string[] = [];
  isSampa: boolean = false;
  showMore: object = {}

  toggleShow(filter){
    this.showMore[filter.label] = this.showMore[filter.label]? !this.showMore[filter.label] : true;
  }

  constructor(private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService,
    private mapservice: MapService,
    private placeService: PlaceService,
    private router: Router,
    private filtersService: FiltersService,
    private activatedRoute: ActivatedRoute,
    private listService: ListService) {
      this.activatedRoute.data.subscribe((data: any)  => {
        if (!!data.category) {
          this.selectedCategories.push(data.category);
          this.openedCategories.push(data.category);
          this.formQuery = this.toggleQuery(data.category);
        } else {
          // TODO this is not cool
          let categories = ['upa', 'market', 'tourism', 'initiative'];
          for(let cat of categories){
            this.selectCategory(cat);
          }
        }
      }).unsubscribe();
      this.isConnectonsActive = !!this.activatedRoute.snapshot.queryParams.connection

      this.filtersSubscription.push(this.filtersService
      .filters$.subscribe((filters) => {
        this.filters = filters;
        this.selectFromQuery(this.filterQuery);
        this.loading = !filters.categories.length;
      }));
    }

  initFilters() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.formQuery = params.filters || this.formQuery;
      this.filtersService.updateFilters(this.formQuery);
    }).unsubscribe();
  }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
    this.getButtonBottom();
    this.subscribeRoutes();

  }

  subscribeRoutes() {
      this.filtersSubscription.push(this.activatedRoute.queryParams
      .subscribe((params) => {
        this.loading = true;
        this.isSampa = params.sampa;
        let query = params.filters || this.formQuery;
        if (params.covid) {
          query += '&covid=true';
        }
        this.filterQuery = query;
        this.filtersService.getFilters(query);
      }));
  }

  ngAfterViewInit() {
    this.initFilters();
    this.getFiltersAreaWidth();
  }

  toggle() {
    this.placeService.resetPlace();
    this.buttonBottom = 36;
    this.listService.toggle(!this.listIsOpen);
    this.mapservice.setButtonBottom(this.buttonBottom);
  }

  getFilters(filters: string) {
    this.filters.categories = [];
    let self = this;
    self.placeService.currentParams
    .subscribe(async (params) => {
      await self.filtersService.getFilters(self.formatParams(params, filters));
    }).unsubscribe();
  }

  formatParams(params, filters){
    if (this.isSampa) {
      params.sampa = true;
    } else {
      params.sampa = null;
    }
    params.filters = this.activatedRoute.snapshot.routeConfig.path === t.url.explore ? '' : filters;
    return params.query();
  }

  getButtonBottom() {
    if(this.isMobile){
      this.filtersSubscription.push(this.mapservice.buttonBottomObs.subscribe(bottom => {
        let filterValueTop = 85;

        if(bottom > 36){
          bottom -= 55;
        }else{
          bottom = -20
        }
        this.styleButtonCovid = {'top' : 'calc(100% - ' + bottom + 'px - ' + filterValueTop + 'px - 60px)'};
        this.styleButton = {'top' : 'calc(100% - ' + bottom + 'px - ' + filterValueTop + 'px)'};
      }));
    }
  }

  toggleConnectons(){
    this.isConnectonsActive = !this.isConnectonsActive;
    this.router.navigate(['/explorar'], { queryParams: {connection: this.isConnectonsActive? true : null}});
  }

  ngOnChanges() {
    this.getFiltersAreaWidth();
  }

  ngOnDestroy() {
    for(let subs of this.filtersSubscription){
      subs.unsubscribe();
    }
  }

  getFiltersAreaWidth() {
    let comp = this;
    setTimeout(() => {
      let catEl = comp.el.nativeElement;
      let catEls = catEl.querySelectorAll('.category-filter');
      for(let cat = 0; cat < catEls.length; cat++) {
        comp.catAreaWidth += (catEls[cat].offsetWidth + 10);
      }
      comp.cdr.detectChanges();
    }, 500);
  }

  toggleFilters() {
    this.placeService.setMenuHide(!this.isOpenFilters);
    let self = this;
    setTimeout(()=>{ self.filtersElement.nativeElement.scrollTop = 0; },10);
    this.isOpenFilters = !this.isOpenFilters;
  }

  selectedCount() {
    return this.filterQuery.split('&').filter((x) => x.length).length
  }

  async closeFilters() {
    this.isOpenFilters = false;
    this.placeService.setMenuHide(false);
  }

  selectAllCategories() {
    const category = this.activatedRoute.snapshot.data.category
    const categories = !!category ? [category] : ['upa', 'market', 'tourism', 'initiative'];
    for(let cat of categories){
      this.selectedCategories.push(cat);
    }
  }

  addAllCategories() {
    const category = this.activatedRoute.snapshot.data.category
    const categories = !!category ? [category] : ['upa', 'market', 'tourism', 'initiative'];
    let filters = '';
    for(let cat of categories){
      filters += this.addCategory(cat);
    }
    return filters
  }

  async resetFilters() {
    this.formQuery = '';
    this.selectAllCategories();
    // TODO fix duplication
    // form query is internal for component
    this.filterQuery = this.addAllCategories();
    this.formQuery = this.filterQuery;
    this.filtersService.getFilters(this.filterQuery);
  }

  getResults(){
    this.isOpenFilters = false;
    this.sendFilters();
  }

  async sendFilters(){
    this.placeService.setMenuHide(false);
    let query = this.formQuery.replace('filters=', '');
    this.filterQuery = query;
    this.filtersService.updateFilters(this.formQuery);
    // TODO improve-me
    let path = [];

    if (this.openedCategories.length > 1 || this.selectedCategories.length > 1) {
      path = ['explorar'];
    } else {
      const category = this.selectedCategories[0] || this.openedCategories[0];
      path = [t.url[category]]
    }

    this.router.navigate(path, {queryParamsHandling: 'merge', queryParams: {
      filters: query
    }});
  }

  toggleFilter(catName): void {
    this.openedCategories = this.toggleList(this.openedCategories, catName);
  }

  private toggleList(list, el) {
    if (list.includes(el)) {
      return list.filter((n) => n !== el);
    }
    list.push(el);
    return list;
  }

  selectCategory(catName): void {
    this.selectedCategories = this.toggleList(this.selectedCategories, catName);
    this.formQuery = this.toggleQuery(catName);
  }

  getTotal(){
    let total = 0;
    for(let category of this.filters.categories){
      if(this.selectedCategories.indexOf(category.name) > -1){
        total += category.count;
      }
    };
    return total;
  }

  // duplicated
  formatFilter(catName: string) {
    return formatFilter(catName, 'type', catName);
  }

  removeAllCatFilters(catName: string, filters){
    let newFilter = filters;
    let filtersToRemove = filters.split(`filters[${catName}]`);
    for(let f = 1; f < filtersToRemove.length; f++){
      newFilter = newFilter.replace(`filters[${catName}]${filtersToRemove[f].split('&')[0]}&`, '');
    }
    return newFilter;
  }

  // duplicated
  toggleQuery(catName: string){
    let filters = this.formQuery;
    if (this.formQuery.includes(catName)) {
      this.removeAllCatFilters(catName, filters);
      filters = filters.replace(`filters[${catName}][type][]=${catName}&`, '')
      return filters;
    }
    filters += this.formatFilter(catName);
    return filters;
  }

  // duplicated
  addCategory(catName: string){
    let filters = this.formQuery;
    if (!this.formQuery.includes(catName)) {
      filters += this.formatFilter(catName);
    }
    return filters;
  }

  toggleFilterClass(catName: string) {
    let klass = 'closed';
    if (this.openedCategories.includes(catName)) {
      klass = 'open';
    }
    if (this.selectedCategories.includes(catName)) {
      klass += ' ' + 'active-' + catName;
    }
    return klass;
  }

  isOpen(catName: string) {
    return (this.selectedCategories.includes(catName) || this.filters.categories.length === 1)
  }

  selectFromQuery(query: string): void {
    this.filters.categories.map((c) => {
      if (query.includes(c.name)) {
        this.selectedCategories = this.verifyListAndToggle(this.selectedCategories, c);
      }
    });
  }

  verifyListAndToggle(categories, c){
    if (!categories.includes(c.name)) {
      return this.toggleList(categories, c.name);
    } else {
      return categories;
    }
  }

  async updateQuery(query: string) {
    this.formQuery = query;
    this.selectFromQuery(query);
    if (this.activatedRoute.snapshot.queryParams.covid) {
      query += '&covid=true';
    }
    await this.filtersService.getFilters(query);
  }

  filterSampa() {
    this.router.navigate([t.url.explore], {queryParams: {
      sampa: this.isSampa ? null : true
    }});
    this.closeFilters();
  }
}
