import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CalculationResult } from '../model/calculation-result';

@Injectable({
  providedIn: 'root'
})
export class CalculatorResultsService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Array<CalculationResult>> {
    return this.http.get<Array<CalculationResult>>(`${environment.api_url}/all`);
  }
}

