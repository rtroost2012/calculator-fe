import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CalculatorService } from './calculator.service';
import { CalculationResult } from '../model/calculation-result';
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

  it('should add two numbers', () => {
    // given
    let first = 10;
    let second = 20;
    let operation = 'ADDITION';

    // when
    service.add(first, second).subscribe((response: CalculationResult) => {
      expect(response.a).toBe(first);
      expect(response.b).toBe(second);
      expect(response.type).toBe(operation);
      expect(response.result).toBe(30.0);
    });

    // then
    let dummyResult: CalculationResult = { id: 1, type: operation, a: first, b: second, result: 30.0 };
    let req = httpMock.expectOne(`${environment.api_url}/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ a: first, b: second });
    req.flush(dummyResult);
  })

  afterEach(() => {
    httpMock.verify();
  })
});
