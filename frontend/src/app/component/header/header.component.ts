import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs';
import { PlaceService } from 'src/app/services/place.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {
  color: String;
  contentColor: String;
  isHide: boolean = false;
  isMobile: boolean = false;
  private mapSubscription: Subscription;
  private hideSubscription: Subscription;

  constructor(public modal: MatDialog,
             private router: Router,
             private mapService: MapService,
             private deviceService: DeviceDetectorService,
             private placeService: PlaceService) {
    this.mapSubscription = this.mapService.currentState.subscribe((eventType: string) => this.mapChanged(eventType))
    this.checkNavigation(this.router);
  }
  textColor: string = '#54595E';
  iconColor: string = 'gray';

  @Input() isGray: boolean;

  openDialog(): void {
    this.modal.open(ModalComponent, {
      width: '80%',
      height: '100%',
      position: { left: '20%' }
    });
  }

  checkNavigation(router: Router): void {
    this.router.events.subscribe((e) => {
      if (((e instanceof NavigationEnd) && (e.url === '/'))) {
        this.iconColor = "white";
        this.textColor = '#E2E2E2';
      }
    });
  }

  mapChanged(eventType: string) {
    if (eventType === 'click') {
      this.textColor = '#54595E';
    }
  }

  ngOnInit() {
    this.checkIfIsHide();
    this.isMobile = this.deviceService.isMobile();
  }

  checkIfIsHide(){
    this.hideSubscription = this.placeService.hideMenuObs.subscribe(hide =>{
      this.isHide = hide;
    });
  }

  ngOnChanges() {
    this.contentColor = this.isGray? 'gray' : 'white';
  }

  ngOnDestroy() {
    this.mapSubscription.unsubscribe();
    this.hideSubscription.unsubscribe();
  }

}
