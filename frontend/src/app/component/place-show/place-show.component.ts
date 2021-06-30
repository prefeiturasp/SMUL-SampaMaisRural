import { Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Place } from '../../models/place.model';
import { PlaceService } from '../../services/place.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatSchedule, formatPhone } from '../../utils/tools';
import { t, tInterface } from '../../utils/translate';
import { FiltersService } from 'src/app/services/filters.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'place-show',
  templateUrl: './place-show.component.html',
  styleUrls: ['./place-show.component.sass']
})
export class PlaceShowComponent implements OnInit {
  @ViewChild('certificates', {static: false}) certificates: ElementRef;
  private currentPlace$: Subscription;
  private lastPage: Subscription;
  private slug$: Subscription;
  hasContact: boolean = false;
  isMobile: boolean = false;
  lastpageUrl: string = '';
  place: Place = new Place;
  loading: boolean = true;
  fullDescription: boolean = false;
  schedules: Array<string> = [];
  t: tInterface = t;
  copied: boolean = false;
  private descriptionBigger: boolean = false;
  descriptionClass: string = '';
  private descriptionDefined: boolean = false;
  private placeConnections: boolean = false;
  private subcriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private placeService: PlaceService,
              private deviceService: DeviceDetectorService,
              private filtersService: FiltersService) {
                this.isMobile = this.deviceService.isMobile();
              }

  scrollToCertificates(): void {
    this.certificates.nativeElement
    .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  openAddress(place) {
    return window.open('https://maps.google.com/maps?q='+ place.lat + ',' + place.lon);
  }

  checkContactInfo(){
    const infos = ['where_find_list', 'full_address', 'schedule', 'product_list', 'workers', 'phone', 'email', 'web_pages'];
    infos.map((info) => {
      if (this.hasInfo(info) && !this.hasContact) {
        this.hasContact = true;
      }
    });
  }

  hasInfo(info: any) {
    return this.place[info] && this.place[info].length;
  }

  getLastPage(){
    this.lastPage = this.placeService.currentCategoryObs.subscribe(value =>{
      this.lastpageUrl = value.indexOf('lugar') === -1? '/' + value : this.lastpageUrl;
    })
  }

  formatPhones(phone){
    return formatPhone(phone);
  }

  back() {
    this.router.navigateByUrl(this.lastpageUrl);
  }

  checklines(desc){
    let height = desc.offsetHeight;
    if(!this.descriptionDefined){
      this.defineDescClasses(height)
      return this.descriptionBigger;
    }else{
      return this.descriptionBigger;
    }
  }

  defineDescClasses(height){
    this.descriptionBigger = ((height / 28) > 5);
    this.descriptionDefined = height > 0? true : false;
    this.descriptionClass = this.descriptionBigger? 'description-hide' : '';
  }

  ngOnInit() {
    this.subscribeCurrentPlace();
    this.slug$ = this.route.paramMap
    .subscribe((paramMap) => {
      this.placeService.getPlace(paramMap.get('slug'));
    });

    this.subcriptions.push(this.route.queryParams.subscribe((params) => {
      const slugs = params.slug;
      this.placeConnections = !!params.connection || !!(slugs && slugs.length);
      this.getLocations();
    }));
    this.getLastPage();
  }

  checkOtherInfos(){
    let infos = ['farms_count', 'area', 'associativism', 'family_work', 'park', 'disabled_friendly_amenities'];
    let result = false;
    for(let info of infos){
      if(this.place[info]){ result = true; }
    }
    return result;
  }

  subscribeCurrentPlace() : void {
    this.currentPlace$ = this.placeService.currentPlace
    .subscribe((place: Place) => {
      if (!place) return;
      this.place = place;
      this.checkContactInfo();
      this.loading = false;
    });
  }


  getLocations() {
    this.placeService.currentParams.subscribe((params) => {
      if (!params.categories.length || this.placeConnections) {
        const connectionEnabled = this.route.snapshot.queryParams.connection? true : false;
        if (!connectionEnabled) {
          params.categories = [this.place.type];
        }

        this.placeService.getLocations(params);
      };
    }).unsubscribe();
  }

  ngOnDestroy() {
    this.slug$.unsubscribe();
    this.currentPlace$.unsubscribe();
    this.lastPage.unsubscribe();
    this.subcriptions.map((subcription) => subcription.unsubscribe());
  }

  copyLink() {
    this.copied = true;
    let link = window.location.href;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    let comp = this;
    setTimeout(function(){
      comp.copied = false;
    }, 1400);
  }
}
