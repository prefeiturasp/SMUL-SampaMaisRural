import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Place, PlacesResult } from '../models/place.model';
import { Category } from '../models/category.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { API_URL } from '../utils/constants';
import { ActivatedRoute } from '@angular/router';
import { PlaceQuery, Coordinate } from '../models/place.query.model';

interface placeQInterface {
  categories?: string[],
  center?: Coordinate,
  filters?: string,
  term?: string,
  covid?: boolean,
  page?: number
}

@Injectable()
export class PlaceService {
  private params = new BehaviorSubject<PlaceQuery>(new PlaceQuery());
  private url = API_URL + '/partners/';

  private resetMap = new Subject<boolean>();
  resetMap$ = this.resetMap.asObservable();

  private locations = new Subject<Category[]>();
  locations$ = this.locations.asObservable();

  private places = new Subject<PlacesResult>();
  places$ = this.places.asObservable();

  private place = new Subject<Place>();
  currentPlace = this.place.asObservable();
  currentParams = this.params.asObservable();

  private currentCategory = new BehaviorSubject('explorar');
  currentCategoryObs = this.currentCategory.asObservable();

  private hideMenu = new BehaviorSubject(false);
  hideMenuObs = this.hideMenu.asObservable();

  private totalConnection = new BehaviorSubject(0);
  totalConnectionObs = this.totalConnection.asObservable();

  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
  }

  setCategory(value) {
    this.currentCategory.next(value);
  }

  setMenuHide(hide) {
    this.hideMenu.next(hide);
  }

  setTotalConnection(total) {
    this.totalConnection.next(total);
  }

  async getPlaces(params: PlaceQuery) {
    let url = this.url + params.query() + this.connectionParams();

    await this.http.get<PlacesResult>(url)
      .subscribe((results) => {
        this.places.next(results);
      });
  }

  connectionParams() {
    let url = '';
    const { queryParams } = this.route.snapshot;
    const connectionEnabled = queryParams.connection ? true : false;
    const connected_subcategories = queryParams.connected_subcategories;
    if (connected_subcategories && connected_subcategories.length) {
      url += connected_subcategories.map((sub) => ("&connected_subcategories[]=" + sub)).join('')
    }

    if (connectionEnabled) {
      url += '&has_related_partners=true'
    }

    return url;
  }

  shouldResetMap() {
    this.resetMap.next(true);
  }

  async getLocations(params: PlaceQuery) {
    let url = API_URL + '/locations?' + params.query() + this.connectionParams();
    const slugs = this.route.snapshot.queryParams.slug
    if (slugs) {
      url = url.replace(('&term=' + params.term), '');
      slugs.map((slug) => {
        url += '&slug[]=' + slug;
      });
    }
    await this.http.get<Category[]>(url).subscribe((categories: Category[]) => {
      this.locations.next(categories);
      this.resetMap.next(false);
    });
  }

  reloadAll(newParams: placeQInterface) {
    this.currentParams
      .subscribe((params: PlaceQuery) => {
        // TODO refactor
        if (newParams.categories && params.categories !== newParams.categories) {
          params.categories = newParams.categories;
        }
        if (newParams.center && params.center !== newParams.center) {
          params.center = newParams.center;
        }
        params.page = newParams.page || 1;
        if (params.filters !== newParams.filters) {
          params.filters = newParams.filters;
        }

        if (params.term !== newParams.term) {
          params.term = newParams.term;
        }

        if (params.covid !== newParams.covid) {
          params.covid = newParams.covid;
        }

        this.getPlaces(params);
        this.getLocations(params);
      }).unsubscribe();
    return this;
  }

  async resetAll() {
    return Promise.resolve([
      this.resetPlace(),
      this.reloadAll({
        term: '',
        covid: false,
        categories: [],
        filters: ''
      })
    ]);
  }

  onHighlight(place: Place) {
    place.highlight = !place.highlight;
    this.place.next(place);
  }

  updateQuery(newParams: PlaceQuery) {
    this.params.subscribe((currentParams: PlaceQuery) => {
      if (!currentParams || newParams.categories !== currentParams.categories || newParams.loaded !== currentParams.loaded || currentParams.center !== newParams.center || currentParams.filters !== newParams.filters) {
        this.params.next(newParams);
      }
    }).unsubscribe();
  }

  resetPlace() {
    const self = this;
    setTimeout(function () {
      self.place.next(null);
    }, 50)
    return this;
  }

  getPlace(slug: string): void {
    this.http.get<Place>(this.url + slug)
      .subscribe((place: Place) => this.place.next(place));
  }

  searchLocations(value) {
    let url = API_URL + '/locations?term=' + value;
    return this.http.get<Category[]>(url);
  }
}
