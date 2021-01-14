import { Component, OnInit } from '@angular/core';
import { CalculationResult } from 'src/app/model/calculation-result';
import { CalculatorResultsService } from 'src/app/service/calculator-results.service';
import { CalculatorService } from 'src/app/service/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  first: Number = 0;
  second: Number = 0;
  type: Number = 0; // ADD,SUBTRACT,MULTIPLY,DIVIDE (0-3)
  results: Array<CalculationResult> = []; // previous results

  constructor(
    private calculatorService: CalculatorService,
    private calculatorResultsService: CalculatorResultsService
  ) { }

  ngOnInit(): void {
    this.loadPrevious();
  }

  /**
   * Attempts to fetch to fetch the previous calculations and
   * load them into the page
   */
  loadPrevious(): void {
    this.calculatorResultsService.findAll().subscribe(
      (res: Array<CalculationResult>) => this.results = this.results.concat(res),
      (err: String) => alert('Error occurred while attempting to fetch previous calculations')
    );
  }

  /**
   * Attempts to calculate and store the given inputs by calling the
   * appropriate API endpoint. 
   */
  calculate(): void {
    this.calculatorService.byType(this.first, this.second, this.type).subscribe(
      (res: CalculationResult) => this.results.push(res),
      (err: String) => alert('Error occurred while attempting to calculate')
    );
  }
}
