/**
 * @author - Ronak Patel.
 * @description -
 */
import { Component, OnInit } from '@angular/core';
// ------------------------------------------------------------------------------------------//
import { DashboardService } from '../dashboard.service';
import { Customers } from '../../customers/customers.model';
import util from '../dashboard.utility';
import { Dashboard, Chart } from '../dashboard.model';
import { Quotation } from '../../quotations/quotations.model';
import { Payment } from '../../payment/payment.model';

@Component({
  selector: 'ims-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * @property customers store customer details type Customer array.
   * @property invoices store customer details type Invoice array.
   * @property quotations store quotation details type Quotation array.
   * @property customersLength store no of customers type number.
   * @property totalQuotationsId store paid and unpaid quotation id type Dashboard.
   * @property totalInvoices store paid and unpaid invoices amount type Dashboard.
   * @property invoiceChart store invoice data for chars type Chart.
   * @property lastTenInvoice store last ten invoice record.
   * @property lastTenCustomer store last ten customer record.
   */
  public customers: Customers[];
  public invoices: any[];
  public quotations: Quotation[];
  public payments: Payment[];
  public customersLength: number;
  public totalQuotationsId: Dashboard;
  public totalInvoices: Dashboard;
  public invoiceChart: Chart[];
  public customerChart: Chart[];
  public lastTenInvoice: any[];
  public lastTenCustomer: Customers[];


  constructor(private service: DashboardService) {
    this.customers = [];
    this.invoices = [];
    this.payments = [];
    this.totalQuotationsId = new Dashboard();
    this.totalInvoices = new Dashboard();
    this.invoiceChart = [];
    this.customerChart = [];
    this.lastTenInvoice = [];
    this.lastTenCustomer = [];
    this.customersLength = 0;

  }

  ngOnInit() {
    this.getCustomers();
    this.getInvoices();
    this.getQuotations();
    this.getPayments();


  }
  /**
   * Create for call dashboardservices and store subscribe data in customers.
   */
  private getCustomers(): void {
    this.service.getCustomers().subscribe(
      (customers: Customers[]) => {
        this.customers = customers;
        this.customersLength = customers.length;
        this.lastTenCustomer = util.lastTenCustomers(customers);

      });
  }
  /**
   * Create for call dashboardservices and store subscribe data in invoices.
   */
  private getInvoices(): void {
    this.service.getInvoices().subscribe(
      (invoices: any[]) => {
        this.invoices = invoices;
        // Call utility class function and store data.
        this.totalQuotationsId = util.quotationIdTotal(invoices);
        // Call utility class function and store data.
        this.invoiceChart = util.invoicesChart(invoices);
        this.lastTenInvoice = util.lastTenInvoices(invoices);
      });
  }
  /**
   * Create for call dashboardservices and store subscribe data in quotations.
   */
  private getQuotations(): void {
    this.service.getQuotations().subscribe(
      (quotations: Quotation[]) => {
        this.quotations = quotations,
          // Call utility class function and store data.
          this.totalInvoices = util.invoiceTotal(quotations, this.totalQuotationsId);
        // convert number to decimal number.
        this.totalInvoices.totalPaidInvoices = +this.totalInvoices.totalPaidInvoices.toFixed(2);
        // convert number to decimal number.
        this.totalInvoices.totalUnpaidInvoices = +this.totalInvoices.totalUnpaidInvoices.toFixed(2);
      });
  }
  /**
   * Create for call dashboardservices and store subscribe data in payments.
   */
  private getPayments(): void {
    this.service.getPayments().subscribe(
      (payments: Payment[]) => {
        this.payments = payments;
      });
  }

}
