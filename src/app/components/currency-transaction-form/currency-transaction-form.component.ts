import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../../services/app/app.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomCurrencyPipe } from '../../pipes/customCurrency/custom-currency.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

const TO_CURRENCY = [
  'EUR', 'BTC',
  'ETH', 'BCH',
  'BNB', 'LINK',
  'LUNA', 'ATOM',
  'SOL', 'USDT'
]

const FROM_CURRENCY = [
  {
    currency: 'EUR',
    available: -1,
  },
  {
    currency: 'BTC',
    available: 8,
  },
  {
    currency: 'ETH',
    available: 422,
  },
  {
    currency: 'USDT',
    available: 50000,
  }
]

@Component({
  selector: 'currency-transaction-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './currency-transaction-form.component.html',
  styleUrl: './currency-transaction-form.component.scss'
})
export class CurrencyTransactionFormComponent {
  private appService = inject(AppService);
  private mockService = inject(MockApiService)
  private fb = inject(FormBuilder)
  private currencyPipe = new CustomCurrencyPipe()
  private _snackBar = inject(MatSnackBar)

  responsiveSize: number = 4
  transactionForm!: FormGroup;
  aimCurrency: string[] = TO_CURRENCY
  availableCurrency = FROM_CURRENCY
  loadingCalculate: boolean = false
  checkAvailableCurrency: boolean = true
  calculateError: boolean = false

  constructor() {}

  ngOnInit(): void {
    this.getBreakpoints()
    this.initForm()
  }

  differentCurrenciesValidator(group: AbstractControl): ValidationErrors | null {
    const fromCurrency = group.get('fromCurrency')?.value;
    const toCurrency = group.get('toCurrency')?.value;

    return fromCurrency && toCurrency && fromCurrency === toCurrency
      ? { sameCurrency: true }
      : null;
  }

  emptyAmountReceive(group: AbstractControl): ValidationErrors | null {
    const receiveAmount = group.get('receiveAmount')?.value;
    const unitPrice = group.get('unitPrice')?.value;

    if (!receiveAmount || !unitPrice) {
      return { requiredDisabledFields: true };
    }
    return null
  }

  handleCancel(): void {
    const element = document.getElementById('header-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        this.appService.activeForm.set(false)
        this.transactionForm.reset()
      }, 500)
    }
  }

  formatInputAmount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    value = value.replace(/[^0-9.,]/g, '');

    const parts = value.split('.');
    parts[0] = parts[0].replace(/,/g, '');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    inputElement.value = parts.join('.');

    // Opcional: Actualizar el valor en el FormControl
    this.transactionForm.get('amount')?.setValue(inputElement.value);
    this.transactionForm.patchValue({
      receiveAmount: '',
      unitPrice: ''
    })
  }

  getBreakpoints() : void {
    this.appService.getBreakpointCols().subscribe((cols: number) => {
      this.responsiveSize = cols;
    });
  }

  checkPipeCurrency(): void{
    this.transactionForm.valueChanges.subscribe(form => {
      if(form.amount || form.receiveAmount || form.unitPrice ){
        this.transactionForm.patchValue({

        })
      }
    })
  }

  initForm(): void {
    this.transactionForm = this.fb.group(
      {
        fromCurrency: ['', Validators.required],
        amount: ['', [Validators.required, Validators.min(1), Validators.max(1e10)],],
        toCurrency: ['', Validators.required],
        receiveAmount: [{ value: '',  disabled: true }, Validators.required],
        unitPrice: [{ value: '', disabled: true }, Validators.required]
      },
      { validators: [this.differentCurrenciesValidator, this.emptyAmountReceive] }
    );
    const receiveAmount = this.transactionForm.get('receiveAmount');
    const unitPrice = this.transactionForm.get('unitPrice');

    receiveAmount?.setValidators([Validators.required]);
    unitPrice?.setValidators([Validators.required]);
  }

  checkAvailableAmount(fromCurrency: string, amount: string): boolean {
    const selectedCurrency = this.availableCurrency.filter((ava) => ava.currency === fromCurrency)

    if(selectedCurrency[0].currency === 'EUR') return true
    if(selectedCurrency.length > 0){
      return selectedCurrency[0].available >= parseInt(amount) ? true : false
    }
    return false
  }

  fetchCalculate(fromCurrency: string, amount: string, toCurrency: string): void{
    this.loadingCalculate = true
      this.mockService.calculateTransaction(amount, fromCurrency,toCurrency).subscribe({
        next: (data) => {
          const auxPrice = data.data[0].quote[toCurrency].price
          let auxUP
          if(fromCurrency === 'EUR') auxUP = (parseFloat(amount.replace(',','')) / auxPrice ).toFixed(3)
          else auxUP = (auxPrice / parseFloat(amount.replace(',','')) ).toFixed(3)

          this.transactionForm.patchValue({
            receiveAmount: this.currencyPipe.transform(auxPrice.toFixed(3)),
            unitPrice: this.currencyPipe.transform(auxUP)
          })
          this.loadingCalculate = false
        },
        error: (error) => {
          console.log(error)
          this.loadingCalculate = false
          this.calculateError = true
        }
      })
  }

  handleCalculate(): void{
    this.checkAvailableCurrency = true
    const {fromCurrency, amount, toCurrency} = this.transactionForm.getRawValue()
    if (fromCurrency && parseFloat(amount) > 0 && toCurrency && fromCurrency !== toCurrency){
      this.fetchCalculate(fromCurrency, amount, toCurrency)
    }
  }

  onInputCurrencyChange(){
    this.transactionForm.patchValue({
      receiveAmount: '',
      unitPrice: ''
    })
  }

  showSuccessMessage(message: string) {
    const snackBarRef = this._snackBar.open(message, 'Close', {
      duration: 300000,
      panelClass: ['success-snackbar'],
    });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload()
    });
  }

  showErrorMessage(message: string) {
    const snackBarRef = this._snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }

  onSubmit() {
    const {fromCurrency, amount} = this.transactionForm.getRawValue()
    if (this.transactionForm.valid) {
      const availableAmount = this.checkAvailableAmount(fromCurrency, amount)
      if(availableAmount) this.showSuccessMessage('Operation completed successfully!');
      else this.checkAvailableCurrency = false
    } else {
      console.log('Formulario inválido');
    }
  }
}
