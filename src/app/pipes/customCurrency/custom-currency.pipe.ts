import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency',
  standalone: true
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    if (!value && value !== 0) {
      return '';
    }

    let numericValue = typeof value === 'string' ? parseFloat(value) : value;

    return numericValue
      .toFixed(3)
      .replace(',', '.')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
