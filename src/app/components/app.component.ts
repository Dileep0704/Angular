import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { } from 'google-maps';

import {Globals} from '../globals'

import { AuthenticationService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABSG';
  currentUser: User;
  //map: google.maps.Map;

  //constructor(private globals: Globals) {}

  constructor(
    private globals: Globals,
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //this.authenticationService.currentUserSubject.subscribe(x => console.log(x));
}

  ngOnInit() {
    this.initializeMap()
  }

  initializeMap() {
    var styles = [];
    styles.push({
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    });

    var mapProp = {
      center: new google.maps.LatLng(24.886, -70.268),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      mapTypeControl: false,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_RIGHT
      },
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
        enableCloseButton: true
      },
      styles: styles,
      clickableIcons: false,
      clickableLabels: false
    };

    this.globals.map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
  }
}
