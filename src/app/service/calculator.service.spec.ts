import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CalculatorService } from './calculator.service';
import { environment } from '../../environments/environment';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should add two numbers', () => {
    // given
    let first = 10;
    let second = 0;

    // when
    service.add(first, second).subscribe(res => {
      console.log('The result is : ' + res);
      // expect(res).toBe(20.0);
    });

    // then
    let dummyResult = { a: first, b: second, result: 20.0 }
    let req = httpMock.expectOne(`${environment.api_url}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ a: first, b: second });
    req.flush(dummyResult);
  })

  afterEach(() => {
    httpMock.verify();
  })
});
