import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/models/place.model';
import { Router, ActivatedRoute } from '@angular/router';
import { t } from '../../utils/translate';
import { routeToSlug } from 'src/app/utils/tools'
import { DeviceDetectorService } from 'ngx-device-detector';
import { ListService } from 'src/app/services/list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.sass']
})
export class ConnectionListComponent implements OnInit {

  @Input() connections: Place[];
  placeConnections: boolean = false;
  private subcriptions: Subscription[] = []

  showAll: boolean = false;

  constructor(private router: Router,
             private route: ActivatedRoute,
             private deviceService: DeviceDetectorService,
             private listService: ListService) { }

  ngOnInit() {
    this.subcriptions.push(this.route.queryParams.subscribe((params) => {
      const slugs = params.slug;
      this.placeConnections = !!(slugs && slugs.length);
    }));
  }

  showMapConnections(){
    const slug = this.route.snapshot.params.slug;
    const slugs = this.connections.map((place) => place.slug);
    if (this.deviceService.isMobile()) {
      this.listService.toggle(false);
      this.router.navigate([t.url.explore], {
        queryParams: {connection: true, slug: [slug].concat(slugs) }});
    } else {
      if (this.placeConnections) {
        this.router.navigate([t.url.explore], {
          queryParams: {connection: true }});
      } else {
        routeToSlug(this, '/lugar/' + slug, { connection: true, slug: [slug].concat(slugs) });
      }
    }
  }

  showMore() {
    this.showAll = !this.showAll;
  }

  ngOnDestroy() {
    this.subcriptions.map((subcription) => subcription.unsubscribe());
  }
}
