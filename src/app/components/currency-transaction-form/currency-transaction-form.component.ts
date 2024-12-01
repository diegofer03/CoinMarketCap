import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../../services/app/app.service';

@Component({
  selector: 'currency-transaction-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './currency-transaction-form.component.html',
  styleUrl: './currency-transaction-form.component.scss'
})
export class CurrencyTransactionFormComponent {
  private appService = inject(AppService);
  responsiveSize: number = 4

  constructor() {}

  ngOnInit(): void {
    this.appService.getBreakpointCols().subscribe((cols: number) => {
      this.responsiveSize = cols;
    });
  }

  handleCancel(): void {
    this.appService.activeForm.set(false)
  }
}
