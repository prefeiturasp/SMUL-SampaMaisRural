import { Component, OnInit, Output, Input, ElementRef, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { getUrlLabel, t, tInterface, translateCat, tforms } from 'src/app/utils/translate';
import { formatFilter } from '../../utils/tools';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'category-filters',
  templateUrl: './category-filters.component.html',
  styleUrls: ['./category-filters.component.sass']
})
export class CategoryFiltersComponent implements OnInit {

  constructor(
    private el: ElementRef,
    private deviceServie: DeviceDetectorService,
    private activatedRoute: ActivatedRoute,
    private placeService: PlaceService,
    private filtersService: FiltersService,
    private router: Router) {
    }

  @Input() onMap: boolean = false;
  @Input() categories: Category[] = [];
  @Input() onList: boolean = false;
  @Input() filterQuery: string = '';
  @Output() onChange = new EventEmitter();
  isMobile: boolean = false;
  link: string = '';
  title: string = '';
  t: tInterface = t;
  showCategories: boolean = true;
  categoryName: string = '';
  Subscriptions: Subscription[] = [];
  isSampa: boolean = false;

  filtersFor(filters) {
    return filters.filter((f) => f.field === tforms.names.subcategory_list);
  }

  valuesFor(category, filter) {
    return filter.values.filter((v) => {
      return this.filterQuery.includes(formatFilter(category,
                                                         filter.field,
                                                         v));
    });
  }

  ngOnInit() {
    this.isMobile = this.deviceServie.isMobile();
    if(this.onMap || (this.onList && !this.isMobile)){
      this.getTitle();
    }

    if(this.onMap){
      this.categoryName = translateCat(this.title) || t.url.corona;
      this.getFiltersOpen();
    }
  }

  changeShowStatus(value){
    this.showCategories = value;
  }

  selectPageAll(){
    this.router.navigateByUrl(t.url.explore);
  }

  getFiltersOpen(){
    this.Subscriptions.push(this.placeService.hideMenuObs.subscribe(hide =>{
      this.showCategories = !hide;
    }));
  }

  getTitle(){
    this.Subscriptions.push(this.activatedRoute.queryParams.subscribe(params => {
      this.isSampa = params.covid;
      if(this.isSampa){
        this.setLink(t.url.corona, t.corona_special);
      } else {
        let categoryName = this.activatedRoute.snapshot.routeConfig.path;
        this.setLink(categoryName, getUrlLabel(categoryName));
      }
    }));
  }

  setLink(link, title){
    this.title = title;
    this.link =  '/' + t.category  + '/' + link;
  }

  formatFilter(categoryName, field, value) {
    return formatFilter(categoryName, field, value);
  }
  // TODO duplicated at all-filters
  onChangeField(categoryName: string, field: string, value:  string){
    const fragment = formatFilter(categoryName, field, value)
    let query = this.filterQuery;
    if (this.filterQuery.includes(fragment)) {
      query = query.replace(fragment, '')
    } else {
      query += fragment;
    }
    this.onChange.emit(query);
  }

  ngOnDestroy(){
    for(let subscriptions of this.Subscriptions){
      subscriptions.unsubscribe();
    }
  }
}
