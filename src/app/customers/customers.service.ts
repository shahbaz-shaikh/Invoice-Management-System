/**
 * @author Vaibhavi Prajapati
 */
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// ---------------------------------------//
import { Customers } from './customers.model';
import { environment } from './../../environments/environment';

@Injectable()
export class CustomersService {
  /**URL for web API */
  public customerURL = environment.baseUrl + '/customer';

  constructor(private http: HttpClient) {}
  /**
   * @description this method add customer dada
   * @param customer take model type
   * its takes customer and url and send to the server
   */
  public addCustomer(customer: Customers): Observable<any> {
    return this.http.post<any>(this.customerURL, customer);
  }
  /**
   * @description this method get customer dada
   * its takes url and send to the server
   */
  getCustomer(): Observable<Customers[]> {
    return this.http.get<Customers[]>(this.customerURL);
  }
  /**for searching data from table */
  searchData(): Observable<Customers[]> {

      return this.http.get<Customers[]>(this.customerURL, { params: { q: '/?=' } });
  }
}
