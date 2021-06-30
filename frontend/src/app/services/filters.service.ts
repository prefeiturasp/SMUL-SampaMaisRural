import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { formatFilter } from '../utils/tools';
import { Filters } from '../models/filters.model';
import { PlaceService } from '../services/place.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  private filters = new BehaviorSubject<Filters>({ categories: [] });
  filters$ = this.filters.asObservable();
  private filterQuery = new BehaviorSubject<string>('');
  filterQuery$ = this.filterQuery.asObservable();

  constructor(private http: HttpClient,
              private placeService: PlaceService,
              private router: Router) {
              }

  getFilters(params: string): void {
    const url = API_URL + '/filters?' + params;
    this.http.get<Filters>(url).subscribe((filters) => {
      this.filters.next(filters);
    });
  }

  updateFilters(query: string) {
    this.filterQuery.next(query);
  }

  resetFilters() {
    this.updateFilters('');
    this.filters.next({ categories: [] })
  }

  async sendFilters(filters: string){
    this.filterQuery.next(filters);
    this.placeService.reloadAll({ filters: filters });
  }

  refreshFilters(query){
    this.updateFilters(query);
    this.router.navigate([], {queryParamsHandling: 'merge', queryParams: {
      filters: query
    }});
  }


  private parseParams(category) {
    let query = '&';
    const filters = category.filters
    .filter((filter) => filter.selected_values && filter.selected_values.length)
    filters.map((filter) => {
      filter.selected_values.map((value: string) => {
        query += formatFilter(category.name, filter.field, value)
      })
    })
    return query;
  }
}
