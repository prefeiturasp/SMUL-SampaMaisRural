import { Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { PlacesComponent } from '../../component/places/places.component';
import { ListService } from '../../services/list.service';
import { FiltersService } from '../../services/filters.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlaceService } from '../../services/place.service';
import { Category } from 'src/app/models/category.model';
import { Categories, formatFilter } from '../../utils/tools';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.sass']
})
export class ExploreComponent implements OnInit {
  @ViewChild("places", {static: false}) places: PlacesComponent;
  listIsOpen: boolean = false;
  bottom: string = 'unset';
  isMobile: boolean = false;
  private subscription: Subscription;
  private listSubscription: Subscription;
  private filtersSubscription: Subscription;
  private filterQuery$: Subscription;
  private hideSubscription: Subscription;
  private totalCountSubscription: Subscription;
  hideFilter: boolean = false;
  filterQuery: string = '';
  categoryFilters: Category[] = [];
  currentCategory: string = '';
  totalCount: number = 0;

  constructor(private deviceService: DeviceDetectorService,
    private listService: ListService,
    private filtersService: FiltersService,
    private el: ElementRef,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,) {
      this.route.data
      .subscribe((data: any) => {
        this.currentCategory = data.category;
      }).unsubscribe();
      this.subscribeListState();
  }

  subscribeListState() {
    this.listSubscription = this.listService.currentState
    .subscribe((listState: boolean) => this.listIsOpen = listState);
  }

  ngOnInit() {
    this.subscribeListState();
    this.isMobile = this.deviceService.isMobile();
    if(!this.isMobile){
      this.listService.toggle(true);
    } else {
      this.getTotalCount();
    }
    this.subscribeFilters();
  }

  getTotalCount(){
    this.totalCountSubscription = this.placeService.places$.subscribe(result =>{
      this.totalCount = result.total_count;
    });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }

    this.listSubscription.unsubscribe();

    if(this.filterQuery$){
      this.filterQuery$.unsubscribe();
    }

    if(this.filtersSubscription){
      this.filtersSubscription.unsubscribe();
    }

    if(this.hideSubscription){
      this.hideSubscription.unsubscribe();
    }

    if(this.totalCountSubscription){
      this.totalCountSubscription.unsubscribe();
    }
    this.filtersService.resetFilters();
  }

  subscribeFilters() {
    this.filterQuery$ = this.filtersService
    .filterQuery$.subscribe((query) => {
      this.filterQuery = query;
    })
    this.filtersSubscription = this.filtersService
    .filters$.subscribe((filters) => {
      this.categoryFilters = filters.categories
      .filter((c) => c.name === this.currentCategory || this.route.snapshot.queryParams.covid);
    });
    this.hideSubscription = this.placeService.hideMenuObs.subscribe((value) =>{
      this.hideFilter = value;
    });
  }

  onSelectedCategory(query) {
    this.filtersService.refreshFilters(query.replace(this.removeExtraFilters(), ''));
  }

  removeExtraFilters(){
    let queryToRemove = '';
    for(let cat of Object.values(Categories)){
      queryToRemove += cat? formatFilter(cat, 'type', cat) : '';
    }
    return queryToRemove;
  }

  toggle(){
    this.listService.toggle(!this.listIsOpen);
  }
}
