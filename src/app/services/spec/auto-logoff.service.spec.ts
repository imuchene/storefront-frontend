import { TestBed } from '@angular/core/testing';

import { AutoLogoffService } from '../auto-logoff.service';

describe('AutoLogoffService', () => {
  let service: AutoLogoffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoLogoffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
