/**
 * @author - Ronak Patel.
 * @description - Create for service class to communicate between server and component.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
// --------------------------------------------------------------------------------------------//
import { Customers } from '../customers/customers.model';
import { environment } from '../../environments/environment';
import { Quotation } from '../quotations/quotations.model';
import { Payment } from '../payment/payment.model';

@Injectable()
export class DashboardService {
  // Store Base url .
  private baseUrl: string;
  // Inject http Client service.
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  /**
   * Get customers from server and pass to component.
   * @property url for customer
   */
  public getCustomers(): Observable<Customers[]> {
    const url = this.baseUrl + '/customer';
    return this.http.get<Customers[]>(url);
  }
  /**
   * Get Invoices from server and pass to component.
   * @property url for invoice.
   */
  public getInvoices(): Observable<any[]> {
    const url = this.baseUrl + '/invoice';
    return this.http.get<any[]>(url);
  }
  /**
   * Get Quotations from server and pass to component.
   * @property url for quotation.
   */
  public getQuotations(): Observable<Quotation[]> {
    const url = this.baseUrl + '/quotation';
    return this.http.get<Quotation[]>(url);
  }
  /**
   * Get Payments from server and pass to component.
   * @property url for payment.
   */
  public getPayments(): Observable<Payment[]> {
    const url = this.baseUrl + '/payment';
    return this.http.get<Payment[]>(url);

  }
  /**
   * Get CustomerByMonth from server and pass to component.
   * @property url for customer.
   */
  public getCustomerByMonth(month: string): Observable<Customers[]> {
    const url = this.baseUrl + '/customer';
    return this.http.get<Customers[]>(url, { params: { q: month } });
  }
  /**
   * Get PaymentByMonth from server and pass to component.
   * @property url for payment.
   */
  public getPaymentByMonth(month: string): Observable<Payment[]> {
    const url = this.baseUrl + '/payment';
    return this.http.get<Payment[]>(url, { params: { q: month } });
  }
  /**
   * Get InvoiceByStatus from server and pass to component.
   * @property url for invoice.
   */
  public getInvoiceByStatus(status: string): Observable<any[]> {
    const url = this.baseUrl + '/invoice';
    return this.http.get<any[]>(url, { params: { status: status } });
  }
  /**
    * Get InvoiceByStatus from server and pass to component.
    * @property url for quotation.
    */
  public getQuotationsByID(id: number): Observable<Quotation> {
    const url = this.baseUrl + '/quotation/' + id;
    return this.http.get<Quotation>(url);
  }

}
