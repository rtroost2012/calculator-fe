import { Component, OnInit } from '@angular/core';
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
  results = [];

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
  }

  calculate(): void {
    let result: Number = 0.0;

    this.calculatorService.byType(this.first, this.second, this.type).subscribe(
      res => { 
        this.results.push(res);
        console.log(this.results);
      },
      err => alert('Error occurred while attempting to calculate'));
  }
}
