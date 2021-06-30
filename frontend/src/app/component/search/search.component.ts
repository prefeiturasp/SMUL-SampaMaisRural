import { Component, OnInit, Input } from '@angular/core';
import { t } from '../../utils/translate';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @Input() isGray: boolean;
  searchValue: string;
  isOpenOnMobile: boolean;
  isMobile: boolean;

  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  searchPlaces() {
    this.router.navigate([t.url.explore], {queryParamsHandling: 'merge', queryParams: {
      term: this.searchValue,
    }});
  }

  clearField(){
    this.searchValue = '';
  }

  mobileClear(){
    this.clearField();
    this.searchPlaces();
  }

  openSearchField(){
    this.isOpenOnMobile = true;
  }

  pressEnter(event){
    if (event.keyCode === 13) {
      this.searchPlaces();
      this.isOpenOnMobile = false;
    }
  }

  closeSearchField(){
    this.mobileClear();
    this.isOpenOnMobile = false;
  }
}
