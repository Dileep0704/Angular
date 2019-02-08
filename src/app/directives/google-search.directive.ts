import { Directive, ElementRef, OnInit } from '@angular/core';
import { } from 'google-maps';

import {Globals} from '../globals';

@Directive({
  selector: '[google-search]'
})
export class GoogleSearchDirective implements OnInit {

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef, private globals: Globals) { 
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    var options = {
      types: ['establishment']
    };

    const autocomplete = new google.maps.places.Autocomplete(this.element);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', this.globals.map);

    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        this.globals.map.fitBounds(place.geometry.viewport);
      } else {
        this.globals.map.setCenter(place.geometry.location);
        this.globals.map.setZoom(17);  // Why 17? Because it looks good.
      }
    });
  }
}
