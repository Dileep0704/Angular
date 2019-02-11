import { Directive, ElementRef, OnInit } from '@angular/core';
import { } from 'google-maps';
import { GoogleMapWrapperService } from '../services/google-map-wrapper.service';


@Directive({
  selector: '[google-map]'
})
export class GoogleMapDirective implements OnInit {

  private element: HTMLInputElement;
  private styles = [
    {
      featureType: 'poi',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    }
  ];
  private mapProp = {
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
    styles: this.styles,
    clickableIcons: false,
    clickableLabels: false
  };

  constructor(private elRef: ElementRef, private googleMapWrapper: GoogleMapWrapperService) { 
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
    googleMapWrapper.createMap(this.element,this.mapProp)
  }

  ngOnInit() {

  }
}
