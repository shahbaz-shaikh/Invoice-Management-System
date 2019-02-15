/**
 * @author Vaibhavi prajapati
 * @description This pipe transform value as prefix USD
 * foe Example: USD 5
 */
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'CustomeCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  constructor() { }

  transform(value: number | string): string {

    const currency = `USD ${value}`;
    return currency;
  }

}
