import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { t } from '../utils/translate';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getThemes() {
    let url = API_URL + '/themes/';
    return this.http.get(url);
  }

  getPosts(theme, page) {
    let url = API_URL;
    if(theme === t.all){
      url += '/posts?page=' + page;
    } else {
      url += '/themes/' + theme + '/posts?page=' + page;
    }
    return this.http.get(url);
  }
}
