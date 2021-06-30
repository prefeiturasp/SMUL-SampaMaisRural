import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { t } from '../../utils/translate';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.sass']
})

export class HomeCardComponent implements OnInit {
  @Input() icon: string;
  @Input() label: string;
  @Input() type: string;
  @Input() mobileHalf: boolean;
  isMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.label = this.label === t.tourism ? t.tourism_rural_experience : this.label;
    this.label = this.label === t.farmers ? t.upa : this.label;
    this.label = this.label === t.initiatives ? t.initiatives_policy : this.label;
  }

}
