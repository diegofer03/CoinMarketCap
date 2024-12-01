import { Component, inject } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from '../../components/header/header.component';
import { MovementsListTableComponent } from '../../components/movements-list-table/movements-list-table.component';
import { InvestmentStatusViewComponent } from '../../components/investment-status-view/investment-status-view.component';
import { CurrencyTransactionFormComponent } from '../../components/currency-transaction-form/currency-transaction-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppService } from '../../services/app/app.service';
import { CommonModule } from '@angular/common';

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
    FooterComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private appService = inject(AppService);
  activeForm = this.appService.activeForm
  cols: number = 4;

  constructor() {

  }

  ngOnInit(): void {
    this.appService.getBreakpointCols().subscribe((cols: number) => {
      this.cols = cols;
    });
  }
}
