/**
 * @author - Shahbaz Shaikh
 * @description - This service file are communication between component to server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// --------------------------------- //
import { environment } from '../../environments/environment';
import { Payment } from './payment.model';
import { Invoice } from '../invoices/invoices.model';
import { Quotation } from '../quotations/quotations.model';
import { Customers } from '../customers/customers.model';

@Injectable()
export class PaymentService {

  // Declare the URL variable for server
  private baseUrl: string;

  /**
   *  Inject http Client service.
   */
  constructor(private http: HttpClient) {
    // Define the URL for server
    this.baseUrl = environment.baseUrl;
  }

  /**
   * getAllPayment Method are get all payment details from server
   */
  public getAllPayments(): Observable<Payment[]> {
    const url = this.baseUrl + '/payment';
    return this.http.get<Payment[]>(url);
  }

  /**
   *  getInvoice method  are get the onvoice those status only paid from server
   * @param id - set the paid invoice id
   */
  public getInvoice(id: number): Observable<Invoice> {
    const url = this.baseUrl + '/invoice/' + id;
    return this.http.get<Invoice>(url);
  }

  /**
   * getQuotation method are use for get the quotation details from server
   * @param id - Get the quotation as per quotation id
   */
  public getQuotation(id: number): Observable<Quotation> {
    const url = this.baseUrl + '/quotation/' + id;
    return this.http.get<Quotation>(url);
  }

  /**
   * getCustomer method are get the customer deatils as per from server
   * @param id - get customer deatils as per customer id
   */
  public getCustomer(id: number): Observable<Customers> {
    const url = this.baseUrl + '/customer/' + id;
    return this.http.get<Customers>(url);
  }

  /**
   * getPagination method are pagination start and end limit
   * @param page - Set the staring page
   * @param pageSize - set the page size change from user
   */
  public getPayment(page: number, pageSize: number, searchRecord: any, sortColumn: string, orderBy: string): Observable<any> {
    const start = (page * pageSize) - pageSize;
    const end = (page * pageSize);
    let url = this.baseUrl + '/payment/' + '?_start=' + start + '&_end=' + end;
    if (searchRecord && searchRecord !== '') {
      url = url.concat('&q=' + searchRecord);
    }
    if (sortColumn && sortColumn !== '') {
      url = url.concat('&_sort=' + sortColumn);
    }
    if (orderBy && orderBy !== '') {
      url = url.concat('&_order=' + orderBy);
    }
    return this.http.get(url, { observe: 'response' });
  }

  /**
   * getSentInvoice method are get the only sent invoice data from server
   */
  public getSentInvoice(): Observable<any[]> {
    const url = this.baseUrl + '/invoice';
    return this.http.get<any[]>(url, {params: {status : 'Sent'}});
  }

  /**
   * addPayment method are add new payment in server
   * @param payment - get the payment data
   */
  public addPayment(payment: Payment): Observable<Payment> {
    const url = this.baseUrl + '/payment';
    return this.http.post<Payment>(url, payment);
  }

  /**
   * updateInvoiceStatus method are successfully add data after invoice status update
   * From Sent To Paid
   * @param invoice - Update Invoice status
   */
  public updateInvoiceStatus(invoice: any): Observable<any> {
    const requestBody = {
      status: invoice.status
    };
    const url = this.baseUrl + '/invoice' + '/' + invoice.invoice_id;
    return this.http.patch<any>(url, requestBody);
  }

  /**
   * deletePayment method are used for delete the record from view
   * @param id - delete the record as per payment ID
   */
  public deletePayment(id: any): Observable<Payment[]> {
    const url = this.baseUrl + '/payment/' + id.id;
    return this.http.delete<Payment[]>(url);
  }

  /**
   * getDetailById method are get the payment deatil by payment id
   * @param id - Get payment by payment id
   */
  public getDetailById(id: number): Observable<Payment> {
    const url = this.baseUrl + '/payment/' + id;
    return this.http.get<Payment>(url);
  }

  /**
   * deleteDetails method are Delete the record from details page
   * @param id - Get payment id from detials page
   */
  public deleteDetails(id: any): Observable<any> {
    const url = this.baseUrl + '/payment/' + id;
    return this.http.delete<any>(url);
  }

}
