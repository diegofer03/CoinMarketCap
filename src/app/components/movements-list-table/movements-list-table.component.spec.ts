import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsListTableComponent } from './movements-list-table.component';

describe('MovementsListTableComponent', () => {
  let component: MovementsListTableComponent;
  let fixture: ComponentFixture<MovementsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementsListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovementsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
