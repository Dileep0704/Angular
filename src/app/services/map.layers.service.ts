import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, fromEventPattern } from 'rxjs';

import { Globals } from '../globals';

@Injectable({ providedIn: 'root' })
export class MapLayerService {

    public mapClick = new Subject<any>();
    public mapClick1 = new BehaviorSubject<any>({});
    public mapCenterChange: Observable<any>;

    constructor(private globals: Globals) { 
      google.maps.event.addListener(this.globals.map, 'click', (event) => {
        this.mapClick.next({ type: 'click', text: event });
        this.mapClick1.next({ type: 'click', text: event });
      })

      // this.mapCenterChange = fromEventPattern(
      //   handler => {
      //     return this.globals.map.addListener('dblclick',handler);
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