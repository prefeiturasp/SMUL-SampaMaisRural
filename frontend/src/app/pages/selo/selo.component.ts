import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Subscription } from 'rxjs';
import { PlacesResult } from '../../models/place.model';
import { t } from '../../utils/translate';
import { formatFilters } from '../../utils/tools';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-selo',
  templateUrl: './selo.component.html',
  styleUrls: ['./selo.component.sass']
})
export class SeloComponent implements OnInit {

  count = null;
  farmersCount = 0;
  marketsCount = 0;
  private placesSubscription: Subscription[] = [];

  constructor(
    private router: Router,
    private placeService: PlaceService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.resetAll()
  }

  async resetAll() {
    this.placeService.resetAll().then(() => {
      this.placesSubscription
        .push(this.placeService.places$
          .subscribe((results: PlacesResult) => {
            this.count = results.total_count;
          })
        );
      this.placeService.currentParams.subscribe((params) => {
        this.placeService.getPlaces(params);
      }).unsubscribe();
      this.getFarmersCount();
      this.getMarketsCount();
    });
  }

  async getFarmersCount() {
    let data = null;
    data = await this.categoriesService.getCategoryInfo('upa').toPromise();
    this.farmersCount = data.farmers_with_contact;
  }

  async getMarketsCount() {
    let data = null;
    data = await this.categoriesService.getCategoryInfo('market').toPromise();
    this.marketsCount = data.with_local_partners;
  }

  openFarmers() {
    const filters = {
      category: 'upa',
      fields: [
        { field: 'subcategory_list', value: t.contact_farmers }
      ]
    };
    const formattedFilters = formatFilters(filters.category, filters.fields);
    this.router.navigate(['/explorar'], {
      queryParams: { filters: formattedFilters }
    });
  }

  openMarkets() {
    const filters = {
      category: 'market',
      fields: [
        { field: 'subcategory_list', value: t.sampa_partners }
      ]
    };
    const formattedFilters = formatFilters(filters.category, filters.fields);
    this.router.navigate(['/explorar'], {
      queryParams: { filters: formattedFilters }
    });
  }

  openMap() {
    this.router.navigate(['/explorar'], {
      queryParams: {
        connection: true,
        connected_subcategories: [t.contact_farmers, t.sampa_partners]
      }
    });
  }

  ngOnDestroy() {
    for (let subs of this.placesSubscription) {
      subs.unsubscribe();
    }
  }
}
