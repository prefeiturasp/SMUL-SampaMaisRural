import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import { HttpClient } from '@angular/common/http';

describe('ContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient}
    ]}));

  it('should be created', () => {
    const service: FormsService = TestBed.get(FormsService);
    expect(service).toBeTruthy();
  });
});
