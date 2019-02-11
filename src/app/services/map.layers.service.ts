//Combine with google-map-wrapper.service
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, fromEventPattern } from 'rxjs';
import { } from 'google-maps';

import { GoogleMapWrapperService } from './google-map-wrapper.service';

@Injectable({ providedIn: 'root' })
export class MapLayerService {

    public mapClick = new Subject<any>();
    public mapClick1 = new BehaviorSubject<any>({});
    public mapCenterChange: Observable<any>;
    private mapRef: google.maps.Map;

    constructor(private googleMapService: GoogleMapWrapperService) { 
      this.mapRef = googleMapService.getMapRef()
      google.maps.event.addListener(this.mapRef, 'click', (event) => {
        this.mapClick.next({ type: 'click', text: event });
        this.mapClick1.next({ type: 'click', text: event });
      })

      // this.mapCenterChange = fromEventPattern(
      //   handler => {
      //     return this.mapRef.addListener('dblclick',handler);
      //   },
      //   (handler, listener) => {
      //     google.maps.event.removeListener(listener);
      //   }
      // );

      // console.log(this.mapCenterChange)
    }

    clickSubscription(): Observable<any> {
      return this.mapClick.asObservable();
    }

}