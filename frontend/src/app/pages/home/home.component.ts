import { Component,
  OnInit,
  ViewChild,
  HostBinding,
  HostListener,
  ChangeDetectorRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';
import { PlacesComponent } from '../../component/places/places.component';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs';
import { homeLinks } from 'src/app/models/home-links.model';
import { t, tInterface } from '../../utils/translate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('mapChanged', [
      state('mouseenter', style({ height: 'calc(100vh - 148px)', marginBottom: '100px' })),
      state('click', style({ height: 0, minHeight: 0 })),

      state('inverse', style({ transform: 'rotate(180deg)' })),
      state('visible', style({ opacity: 1, zIndex: 2000 })),
      state('hidden', style({ opacity: 0, zIndex: -1 })),

      transition('* => void', [
        style({ display: 'none' }),
      ]),

      transition('* <=> *', [
        animate('0.3s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  @ViewChild('places', {static: false}) places: PlacesComponent;
  contentColor: String = 'gray';
  homeLinks: homeLinks[] = [];
  arrowClass: boolean = false;
  arrowClassStatus: boolean = false;
  private mapEvent: String;
  private mapSubscription: Subscription;
  t: tInterface = t;

  @HostBinding('@mapChanged') get mapState() { return this.mapEvent; };

  @HostListener('@mapChanged.done', ['$event']) mapChangedDone(event: any): void {
    if (event.toState === 'click'){
      this.router.navigate(['/explorar']);
    }

    if(event.toState === 'mouseleave') {
      this.arrowClass = false;
    }

    if(event.toState === 'mouseenter') {
      this.arrowClass = true;
    }
  }

  ngAfterViewChecked() {
    this.arrowClassStatus = this.arrowClass;
    this.cdr.detectChanges();
 }

  constructor(private router: Router,
              private mapService: MapService,
              private cdr: ChangeDetectorRef) {
                this.router.config
                .filter((item: any) => !!item.data.sidenav)
                .map((item: any) => this.homeLinks
                     .push({ label: item.data.label,
                           path: item.path,
                           type: item.data.category,
                           icon: item.data.homeIcon }));
                this.mapSubscription = this.mapService.currentState
                .subscribe((mapState: string) => {
                  this.mapEvent = mapState;
                });
              }


  mapChanged(event: any): void {
    this.mapService.mapChanged(event);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mapSubscription.unsubscribe();
  }
}
