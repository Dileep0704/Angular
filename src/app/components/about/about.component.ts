import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import {Globals} from '../../globals';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  title =  "Dileep";
  constructor(private globals: Globals) { }

  ngOnInit() {
    this.subscribeToCustomObservable()
  }

  //Create a new Observable
  fromEvent(target, eventName) {
    return new Observable((observer) => {
      const handler = (e) => observer.next(e);
   
      // Add the event handler to the target
      target.addEventListener(eventName, handler);
   
      return () => {
        // Detach the event handler from the target
        target.removeEventListener(eventName, handler);
      };
    });
  }

  subscribeToCustomObservable() {
    const ESC_KEY = 27;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    
    const subscription = this.fromEvent(nameInput, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        if (e.keyCode === ESC_KEY) {
          nameInput.value = '';
        }
      });
  }

  firstClick() {
    console.log(this.globals.map.getZoom());

    var triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118}
    ];

    var flightPlanCoordinates = [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];

    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    flightPath.setMap(this.globals.map);
  }

}
