import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, filter, scan, skip } from 'rxjs/operators';
import { } from 'google-maps';

import { DataService } from '../../services/data.service';
import { MapLayerService } from '../../services/map.layers.service';
import {Globals} from '../../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  h1Style: boolean = false;
  users: Object;
  //map: google.maps.Map;
  private mapClickSubscription: Subscription;

  constructor(
    private data: DataService,
    private mapLayer: MapLayerService,
    private globals: Globals
  ) { }

  ngOnInit() {
    //this.initializeMap()
    this.loadDummyUsers()
    this.mapClick()
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

  loadDummyUsers() {
    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    })
  }

  firstClick() {
    //this.h1Style = !this.h1Style;
    //this.data.firstClick();
    console.log(this.globals.map.getZoom());

    var triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];

    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(this.globals.map);
  }

  mapClick() {

    //Different ways of subscription
    // this.mapClickSubscription = this.mapLayer.clickSubscription().subscribe(event => {
    //   console.log("lat: " + event.text.latLng.lat() + ", lng: " + event.text.latLng.lng())
    // });

    // this.mapClickSubscription = this.mapLayer.mapClick1.pipe(skip(1)).subscribe(event => {
    //   alert("lat: " + event.text.latLng.lat() + ", lng: " + event.text.latLng.lng())
    // });

    // this.mapLayer.mapClick1.pipe(skip(1)).subscribe({
    //   next(event) { console.log("lat: " + event.text.latLng.lat() + ", lng: " + event.text.latLng.lng()); },
    //   error(msg) { console.log('Error Getting Lat Lng: '); }
    // });

    this.mapLayer.mapClick1.pipe(skip(1))
      .subscribe(
      event => {
        console.log("lat: " + event.text.latLng.lat() + ", lng: " + event.text.latLng.lng());
      },
      error => {
        console.log('Error Getting Lat Lng: ');
      });

    // this.mapLayer.mapCenterChange
    // .subscribe(
    //   event => {
    //     console.log("MapCenter----" + "lat: " + event.latLng.lat() + ", lng: " + event.latLng.lng());
    //   }
    // )
  }
}
