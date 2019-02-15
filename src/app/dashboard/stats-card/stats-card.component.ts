/**
 * @author - Ronak Patel.
 * @description - Create for card status.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
// -------------------------------------------------- //
import { Card } from './card/card.model';
import { CustomCurrencyPipe } from '../../shared/custome-currency.pipe';


@Component({
  selector: 'ims-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit, OnChanges {
  // get data from parent component.
  @Input() public customers;
  @Input() public dashboard;

  /**
   *@property customer for customer card
   *@property amountRecivable for amount ricivable card.
   *@property totalRevenue for total revenue card.
   *@property unpaidInvoice for unpaid invoice card.
   */
  public customer: Card;
  public amountRecivable: Card;
  public totalRevenue: Card;
  public unpaidInvoice: Card;
  customCurrency: any;

  constructor() {
    this.customer = new Card();
    this.amountRecivable = new Card();
    this.totalRevenue = new Card();
    this.unpaidInvoice = new Card();
    this.customCurrency = new CustomCurrencyPipe();
  }

  ngOnInit() {


  }
  ngOnChanges() {
    // store data in customer.
    this.customer.title = 'Customers';
    this.customer.data = this.customers;
    // store data in amountRecivable.
    this.amountRecivable.title = 'Amount Recivable';
    this.amountRecivable.data = this.customCurrency.transform(this.dashboard.totalUnpaidInvoices);
    // store data in totalRevenue.
    this.totalRevenue.title = 'Total Revenue';
    this.totalRevenue.data = this.customCurrency.transform(this.dashboard.totalPaidInvoices);
    // store data in unpaidInvoice.
    this.unpaidInvoice.title = 'Unpaid Invoice';
    this.unpaidInvoice.data = this.dashboard.unpaidQuotationsId;
  }

}
