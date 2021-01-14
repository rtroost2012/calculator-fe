import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CalculationResult } from 'src/app/model/calculation-result';
import { CalculatorResultsService } from 'src/app/service/calculator-results.service';
import { CalculatorService } from 'src/app/service/calculator.service';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mockCalculatorResultsService: CalculatorResultsService;
  let mockCalculatorService: CalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, FormsModule ],
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Component fixture
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Mock services
    mockCalculatorResultsService = TestBed.inject(CalculatorResultsService);
    mockCalculatorService = TestBed.inject(CalculatorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load previous results', () => {
    // given
    let testdata: Array<CalculationResult> = [{
      id: 1, a: 10.0, b: 20.0, type: 'ADDITION', result: 30.0
    }];
    
    // when
    spyOn(mockCalculatorResultsService, 'findAll').and.returnValue(of(testdata));
    component.loadPrevious();

    // then
    expect(mockCalculatorResultsService.findAll).toHaveBeenCalledTimes(1);
    expect(component.results).toEqual(testdata);
  });

  it('should be able to calculate', () => {
    // given
    let id = 1;
    let first = 100.0;
    let second = 200.0;
    let type = 1; // subtraction
    let testdata: CalculationResult = { id: id, a: first, b: second, type: 'ADDITION', result: -100.0 };

    component.first = first;
    component.second = second;
    component.type = type;

    // when
    spyOn(mockCalculatorService, 'byType').and.returnValue(of(testdata));
    component.calculate();

    // then
    expect(mockCalculatorService.byType).toHaveBeenCalledWith(first, second, type);
    expect(component.results).toEqual([testdata]);
  });
});
