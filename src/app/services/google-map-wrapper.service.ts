import { Injectable, NgZone } from '@angular/core';
import {Observable, Observer} from 'rxjs';

import { } from 'google-maps';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapWrapperService {

  private map;
  
  constructor(private _zone: NgZone) {

  }

  createMap(element, mapOptions) {
    this._zone.runOutsideAngular(() => {
      this.map = new google.maps.Map(element, mapOptions);
    })
  }

  getMapRef() {
    if(this.map) {
      return this.map
    }
  }

  setMapOptions(options) {
    this.map.setOptions(options)
  }

  subscribeToMapEvent<E>(eventName: string): Observable<E> {
    return new Observable((observer: Observer<E>) => {
      if (this.map) {
        this.map.addListener(eventName, (arg: E) => { this._zone.run(() => observer.next(arg)); });
      }
    });
  }

  clearInstanceListeners() {
    if (this.map) {
      google.maps.event.clearInstanceListeners(this.map);
    }
  }

  setCenter(latLng) {
    this.map.setCenter(latLng)
  }

}
