import { TestBed } from '@angular/core/testing';

import { GoogleMapWrapperService } from './google-map-wrapper.service';

describe('GoogleMapWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleMapWrapperService = TestBed.get(GoogleMapWrapperService);
    expect(service).toBeTruthy();
  });
});
