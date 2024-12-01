import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { FetchStatusInvest, StatusInvest } from '../../models/app.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from '../../services/app/app.service';
import { CustomCurrencyPipe } from '../../pipes/customCurrency/custom-currency.pipe';

@Component({
  selector: 'investment-status-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
     MatTooltipModule,
     CommonModule,
     MatProgressSpinnerModule,
     CustomCurrencyPipe
    ],
  templateUrl: './investment-status-view.component.html',
  styleUrl: './investment-status-view.component.scss'
})
export class InvestmentStatusViewComponent {
  private mockApiService = inject(MockApiService);
  private appService = inject(AppService);

  loading: boolean = false
  dataStatus: StatusInvest | null = null
  dataResult: string = ''
  revenue: boolean = false
  errorFetch: boolean = false

  constructor() {}

  ngOnInit(){
    this.fetchStatusInvest()
  }

  fetchStatusInvest() : void {
    this.loading = true;
    this.mockApiService.getStatusInvest().subscribe({
      next:(response : FetchStatusInvest) => {
        this.dataStatus = response.data;
        this.calculateResult(this.dataStatus)
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
        this.loading = false;
        this.errorFetch = true
      }
    });
  }

  calculateResult(data: StatusInvest): void{
    const aux =  (parseFloat(data.actualWorth.replace(/\./g, '').replace(',', '.')) - parseFloat(data.invested.replace(/\./g, '').replace(',', '.')))
    this.revenue = aux > 0 ? true : false
    this.dataResult = aux.toFixed(2) + ''
  }

  handleActiveForm(): void{
    this.appService.activeForm.update((state) => !state)
    setTimeout(() => {
      const element = document.getElementById('form-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100)
  }

  handleReload(): void {
    location.reload();
  }
}
