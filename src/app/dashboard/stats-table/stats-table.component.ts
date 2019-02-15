/**
 * @author - Ronak Patel.
 * @description - Create for show table in dashboard component
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
// ------------------------------------------------------------------------//
import { Customers } from '../../customers/customers.model';
import { Action } from '../../shared/table/table.model';

@Component({
  selector: 'ims-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss']
})
export class StatsTableComponent implements OnInit, OnChanges {
  public customers: Customers;
  // Get Invoice details from parent component.
  @Input() public lastTenInvoice: any[];
  // Get Customer details from parent componet.
  @Input() public lastTenCustomer: Customers[];
  public invoiceHeading = {
    name: ['Id', 'Invoice_Number', 'Due_Date', 'Quotation_Id', 'Issue_Date', 'Status'],
    key: ['id', 'invoice_number', 'due_date', 'quotation_id', 'issue_date', 'status']
  };
  public customerHeading = {
    name: ['Id', 'Name', 'Customer_Number', 'Email', 'Group', 'Company', 'Created_At'],
    key: ['id', 'name', 'customer_number', 'email', 'group', 'company', 'created_at']
  };
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {

  }

}
