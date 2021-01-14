import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CalculationResult } from '../model/calculation-result';

import { CalculatorResultsService } from './calculator-results.service';

describe('CalculatorResultsService', () => {
  let service: CalculatorResultsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CalculatorResultsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to fetch previous calculations', () => {
    // when
    service.findAll().subscribe((response: Array<CalculationResult>) => {
      expect(response.length).toBe(2);

      for (let i = 0; i < 2; i ++) {
        expect(response[i].id).toBe(i + 1);
        expect(response[i].type).toBe('ADDITION');
        expect(response[i].a).toBe(10.0);
        expect(response[i].b).toBe(20.0);
        expect(response[i].result).toBe(30.0);
      }
    })

    // then
    let req = httpMock.expectOne(`${environment.api_url}/all`);
    let dummyResult: Array<CalculationResult> = [
      { id: 1, type: 'ADDITION', a: 10.0, b: 20.0, result: 30.0 },
      { id: 2, type: 'ADDITION', a: 10.0, b: 20.0, result: 30.0 }
    ];
    expect(req.request.method).toBe('GET');
    req.flush(dummyResult);
  });
});
