import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }

  /**
   * Sends an API call to add two numbers, returns an observable
   * @param first The first number
   * @param second The second number
   */
  add(first: Number, second: Number): Observable<Object> {
    return this.http.post(`${environment.api_url}/add`, { a: first, b: second });
  }

  /**
   * Sends an API call to subtract two numbers, returns an observable
   * @param first The first number
   * @param second The second number
   */
  subtract(first: Number, second: Number): Observable<Object> {
    return this.http.post(`${environment.api_url}/subtract`, { a: first, b: second });
  }

    /**
   * Sends an API call to multiply two numbers, returns an observable
   * @param first The first number
   * @param second The second number
   */
  multiply(first: Number, second: Number): Observable<Object> {
    return this.http.post(`${environment.api_url}/multiply`, { a: first, b: second });
  }

  /**
   * Sends an API call to divide two numbers, returns an observable
   * @param first The first number
   * @param second The second number
   */
  divide(first: Number, second: Number): Observable<Object> {
    return this.http.post(`${environment.api_url}/divide`, { a: first, b: second });
  }

  /**
   * Sends an API call to perform a calculation, based on the given type
   * @param first The first number
   * @param second The second number
   * @param type The calculation type
   */
  byType(first: Number, second: Number, type: Number) {
    switch (type) {
      case 0: // ADDITION
        return this.add(first, second);
      case 1: // SUBTRACTION
        return this.subtract(first, second);
      case 2: // MULTIPLY
        return this.multiply(first, second);
      case 3: // DIVISION
        return this.divide(first, second);
    }
  }
}
