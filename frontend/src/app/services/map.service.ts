import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils/constants';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MapService {
  private mapState = new Subject<String>();
  currentState = this.mapState.asObservable();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute)
    {
    }

  private buttonBottom = new BehaviorSubject(36);
  buttonBottomObs = this.buttonBottom.asObservable();

  mapChanged(event: any) {
    this.mapState.next(event.type);
  }

  setButtonBottom(value) {
    this.buttonBottom.next(value);
  }

  getShapes(type: string){
    let url =  API_URL + '/regions/' + type;
    return this.http.get(url);
  }

  getConnections(){
    let url =  API_URL + '/related_partners?';
    const connected_subcategories = this.route.snapshot.queryParams.connected_subcategories;
    if (connected_subcategories && connected_subcategories.length) {
      url += connected_subcategories.map((sub) => ("&connected_subcategories[]=" + sub)).join('')
    }
    return this.http.get(url);
  }
}
