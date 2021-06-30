import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routeToSlug } from 'src/app/utils/tools';

@Component({
  selector: 'connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.sass']
})
export class ConnectionCardsComponent implements OnInit {

  @Input() connection;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  open(place) {
    const connection = this.route.snapshot.queryParams.connection? true : null;
    const slugs = this.route.snapshot.queryParams.slug;
    const related_partner_slugs = [place.slug].concat(place.related_partner_slugs)
    if (!!(slugs && slugs.length)) {
      routeToSlug(this, '/lugar/' + place.slug, { connection: connection, slug: related_partner_slugs });
    } else {
      routeToSlug(this, '/lugar/' + place.slug, { connection: connection });
    }
  }

}
