import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Place } from '../../models/place.model';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.sass']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place = new Place;
  @Input() highlight: boolean = false;
  schedules: Array<string> = [];

  constructor(private placeService: PlaceService) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightPlace();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlightPlace();
  }

  highlightPlace(){
    if (this.highlight) {
      this.placeService.onHighlight(this.place);
    }
  }

  ngOnInit() {
  }

  capitalizeName(string) {
    if(typeof string === 'string' || string instanceof String)
      return string;
  }
}
