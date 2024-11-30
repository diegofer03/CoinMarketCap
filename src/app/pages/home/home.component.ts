import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from '../../components/header/header.component';
import { MovementsListTableComponent } from '../../components/movements-list-table/movements-list-table.component';
import { InvestmentStatusViewComponent } from '../../components/investment-status-view/investment-status-view.component';
import { CurrencyTransactionFormComponent } from '../../components/currency-transaction-form/currency-transaction-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridListModule,
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

}
