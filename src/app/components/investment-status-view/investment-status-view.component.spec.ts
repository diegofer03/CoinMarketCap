import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentStatusViewComponent } from './investment-status-view.component';

describe('InvestmentStatusViewComponent', () => {
  let component: InvestmentStatusViewComponent;
  let fixture: ComponentFixture<InvestmentStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentStatusViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
