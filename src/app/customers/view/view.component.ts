/**
 * @author Vaibhavi Prajapati
 */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
// --------------------------------------//
import { Customers } from './../customers.model';
import { CustomersService } from './../customers.service';
import { Sort } from '../../shared/order-by/sort.model';
@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  /**key for table header which display in dropdown of order-by */
  key = ['id', 'number', 'person', 'company', 'group', 'created At'];

  /**action for perform operation */
  public action = ['EDIT', 'DELETE'];

  /**heading for table */
  public heading = {
    name: ['ID', 'Number', 'Person', 'Company', 'Group', 'CreatedAt'],
    key: ['id', 'customer_number', 'name', 'company', 'group', 'created_at']
  };
  public totalItems = '';
  public page = '';
  public pageSize = '';

  public customers: Customers[];
  public map;
  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCustomers();
  }
  actionClick(id, id1) {
    this.router.navigate(['customer/add']);
  }
  public sort(sort: Sort) {}
  public search(data) {
    console.log(data);
  }
  /**this method generate pdf file
   * in data variable contenttoConvert contain id of table with we display in pdf
   */
  public export() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
  /** this methos get all data from the server using service */
  getCustomers() {
    this.customersService.getCustomer().subscribe(customer => {
      // this.customers = this.mapData(data);
      this.customers = customer;
    });
  }
  serch(data) {
    this.customersService.searchData().subscribe(cust => {
      this.customers = cust;
      console.log(this.customers);
    });
  }

  // mapData(data: Customers[]): Customers[] {
  //   const mappedData: Customers[] = [];
  //   data.map(each => {
  //     this.map = [
  //       {
  //         id: each.id,
  //         customerNumber: each.customer_number,
  //         name: each.name,
  //         company: each.company,
  //         group: each.group,
  //         createdAt: each.created_at,
  //         email: each.email,
  //         mobileNumber: each.mobile_number,
  //         address: each.address
  //       }
  //     ];
  //     console.log(this.map);

  //   });
  //   mappedData.push(this.map);
  //   return ;
  // }
}
