/**
 * @author - Ronak Patel.
 * @description - Create class for display chart on dahsboard.
 */
import { Component, OnInit, Input } from '@angular/core';
// -----------------------------------------------------------------------------//
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'ims-stats-graph',
  templateUrl: './stats-graph.component.html',
  styleUrls: ['./stats-graph.component.scss']
})
export class StatsGraphComponent implements OnInit {
  // get data from parent.
  @Input() public invoiceChart;
  /**
   * @property paymentChart store payment chart data.
   * @property customerChart store customer chart data.
   * @property customerData store customer data.
   * @property paymentData store payement data.
   * @property  invoiceData store invoice data.
   * @property invoiceMerge store invoice ,quotation and payment data.
   */
  public paymentChart;
  public customerChart;
  public customerData: any;
  public paymentData: any;
  public invoiceData: any;
  public invoiceMerge: any = [];
  public isBoolean: boolean;
  constructor(private service: DashboardService) {
    this.customerData = [];
    this.paymentData = [];
    this.isBoolean = true;
  }
  ngOnInit() {
    this.mothWiseData();
    this.getpayment();
  }
  /**
   * Create for get month wise data from server.
   */
  public mothWiseData(): void {
    const months = ['-Jan-', '-Feb-', '-Mar-', '-Apr-', '-May-', '-Jun-', '-Jul-', '-Aug-', '-Sep-', '-Oct-', '-Nov-', '-Dec-'];
    months.forEach(month => {
      this.service.getCustomerByMonth(month).subscribe(customer => {
        this.customerData.push({ 'name': month, 'value': customer.length, 'customer': customer });
        this.service.getPaymentByMonth(month).subscribe(payment => {
          this.paymentData.push({ 'name': month, 'value': payment });
          this.change();
        });
      });
    });
  }
  /**
   * create for status wise data form server.
   */
  public getpayment(): void {
    const status = 'Paid';
    this.service.getInvoiceByStatus(status).subscribe(invoices => {
      invoices.forEach(invoice => {
        this.service.getQuotationsByID(invoice.quotation_id).subscribe((quotation: any) => {
          this.invoiceMerge.push({ invoice: invoice.id, quotation: quotation.grand_total });
          this.change();
        });
      });

    });
  }
  /**
   * Create for user click on show more chart.
   */
  public change() {
    this.isBoolean = !this.isBoolean;
    const payment = this.paymentData;
    const quotations = this.invoiceMerge;
    this.paymentChart = [];
    this.customerChart = [{
      'name': 'Customer Visit', 'series': this.customerData
    }
    ];
    payment.forEach(element => {
      let value = 0;
      element.value.forEach(invoice => {
        for (let index = 0; index < quotations.length; index++) {
          if (invoice.invoice_id === quotations[index].invoice) {
            value +=  quotations[index].quotation;
            break;
          }
        }
      });
      this.paymentChart.push({ 'name': element.name, 'value': value });
    });

  }
}
