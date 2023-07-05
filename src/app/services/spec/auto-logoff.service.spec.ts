import { TestBed } from '@angular/core/testing';

import { AutoLogoffService } from '../auto-logoff.service';

describe('AutoLogoffService', () => {
  let service: jasmine.SpyObj<AutoLogoffService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AutoLogoffService', [
      'lastAction',
      'initListener',
      'initInterval',
      'reset',
      'check',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: AutoLogoffService, useValue: spy }],
    });

    service = TestBed.inject(AutoLogoffService) as jasmine.SpyObj<AutoLogoffService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
