import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-calculator',
  template: ''
})
class MockCalculatorComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockCalculatorComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
