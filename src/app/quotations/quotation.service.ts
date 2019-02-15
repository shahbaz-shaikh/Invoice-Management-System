/**
 * @author Yamini Gala
 * @description this service is used to communicate with the component and backend.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

// ------------------------------//
import { environment } from '../../environments/environment';
import { Customers } from '../customers/customers.model';
import { Quotation } from './quotations.model';

@Injectable()
export class QuotationService {
  // URL To webAPI
  readonly url: string;
  private queryUrl: string;

  /**
   * @param http -Inject httpClient service for server interaction.
   */
  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;
  }
  /**
   * @description use for get th qoutation list
   */
  public getQoutation(): Observable<any[]> {
    const url = this.url + '/quotation';
    return this.http.get<Quotation[]>(url);
  }
  public getCustomer(id: number): Observable<any[]> {
    const url = this.url + '/customer';
    return this.http.get<Customers[]>(url + '/' + id);
  }
  public forkJoin(): Observable<any[]> {
    const res1 = this.http.get<any>(this.url + '/quotation');
    const res2 = this.http.get<any[]>(this.url + '/customer');
    return Observable.forkJoin([res1, res2]);
  }
  /**
   *@description search the record in the databse witch is passed by user
   */
  public searchList(search: any): Observable<any> {
    const url = this.url + '/quotation';
    this.queryUrl = '?q=';
    const urls = url + this.queryUrl + search;
    return this.http.get<any>(urls);
  }
  /**
   * @description this is used for pagination the data based on the page and page size passed
   */
  public getForPage(page: number, pagesize: number) {
    const start = (page * pagesize) - pagesize;
    const end = (page * pagesize);
    const url = this.url + '/quotation' + '?_page=' + start + '&_limit=' + end;

    return this.http.get<Quotation[]>(url);
  }
  /**
   * @description this method is used for assending and desending the record.
   * @param id unique identifire.
   * @param order it is used for in which order user want display record for example asc and desc.
   */
  public sortQoutation(id: number, order: string): Observable<Quotation[]> {
    order = 'DESC';
    const url = this.url + '/quotation' + '?_sort=' + id + '_order=' + order;
    console.log(url);

    return this.http.get<Quotation[]>(url);
  }
  /**
   * @description it is used for  delete record by perticular id
   * @param id perticular id to delete record.
   */
  public deleteQoutation(id: number): Observable<Quotation[]> {
    const url = this.url + '/quotation' + '/' + id;
    return this.http.delete<Quotation[]>(url);
  }

  public getCustomers(): Observable<any[]> {
    const url = this.url + '/customer';
    return this.http.get<Customers[]>(url);
  }

  public getProduct(): Observable<any[]> {
    const url = this.url + '/product';
    return this.http.get<any[]>(url);
  }

  public addQuotation(quotation: Quotation): Observable<Quotation> {
    const url = this.url + '/quotation';
    return this.http.post<Quotation>(url, quotation);
  }
}
