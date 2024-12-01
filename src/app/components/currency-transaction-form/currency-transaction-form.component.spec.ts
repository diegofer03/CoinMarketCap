import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTransactionFormComponent } from './currency-transaction-form.component';

describe('CurrencyTransactionFormComponent', () => {
  let component: CurrencyTransactionFormComponent;
  let fixture: ComponentFixture<CurrencyTransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyTransactionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyTransactionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
