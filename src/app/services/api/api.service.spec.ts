import { TestBed, inject } from '@angular/core/testing';

import { ApiServiceService } from './api.service';

describe('ApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiServiceService]
    });
  });

  it('should be created', inject([ApiServiceService], (service: ApiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
