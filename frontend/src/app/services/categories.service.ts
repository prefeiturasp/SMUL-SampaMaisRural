import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { t } from '../utils/translate';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoryInfo(categoryName: string) {
    let url = API_URL + (categoryName !== t.url.corona? '/all_data/' : '/') + categoryName;
    return this.http.get(url);
  }
}
