import { Filters } from '../models/filters.model';

export interface Coordinate {
  lat: number,
  lon: number
}

export class PlaceQuery {
  categories: string[] = [];
  center: Coordinate;
  loaded: boolean;
  page: number = 1;
  filters: string = '';
  term: string = '';
  covid: boolean = false;

  constructor(categories: Array<string> =[], center: Coordinate = {lat: 0, lon: 0}, loaded: boolean = false, term: string = '', covid: boolean = false) {
    this.center = center;
    this.loaded = loaded;
    this.categories = categories;
    this.term = term;
    this.covid = covid;
  }

  resetFilters() {
    this.filters = ';'
  }

  query() {
    let query = '?page=' + this.page;
    this.categories.map((category) => {
      // TODO change-me: should receive all categories when came blank
      if (category) {
        query += '&type[]=' + category;
      }
    });

    if (this.filters && this.filters.length) {
      query += '&' + this.filters;
    }

    if (this.center) {
      query += '&center_lat=' + this.center.lat + '&' + 'center_lon=' + this.center.lon;
    }

    if (this.term) {
      query += '&term=' + this.term;
    }

    if (this.covid) {
      query += '&covid=' + this.covid;
    }

    return query;
  }
}
