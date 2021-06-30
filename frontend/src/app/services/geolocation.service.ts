import { Injectable } from '@angular/core';;
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {

  constructor(private http: HttpClient){}

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        const coords = resp.coords;
        resolve([coords.latitude, coords.longitude]);
      },
      err=> reject());
    });
  }

  getCoords(address){
    return this.http.get('https://nominatim.openstreetmap.org/search?format=json&street='+ address + '&city=São Paulo&country=Brasil');
  }
}
