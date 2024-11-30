import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from '../../components/header/header.component';
import { MovementsListTableComponent } from '../../components/movements-list-table/movements-list-table.component';
import { InvestmentStatusViewComponent } from '../../components/investment-status-view/investment-status-view.component';
import { CurrencyTransactionFormComponent } from '../../components/currency-transaction-form/currency-transaction-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridListModule,
    LayoutModule,
    HeaderComponent,
    MovementsListTableComponent,
    InvestmentStatusViewComponent,
    CurrencyTransactionFormComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  cols: number = 4;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 2;
        } else if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = 3;
        } else {
          this.cols = 4;
        }
      });
  }
}
