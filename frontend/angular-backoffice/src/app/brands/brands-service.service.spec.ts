import { TestBed } from '@angular/core/testing';

import { BrandsServiceService } from './brands-service.service';

describe('BrandsServiceService', () => {
  let service: BrandsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
