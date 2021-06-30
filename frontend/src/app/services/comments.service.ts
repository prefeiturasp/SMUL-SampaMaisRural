import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(id)  {
    let url = API_URL + `/partners/${ id }/comments`;
    return this.http.get(url);
  }
}
