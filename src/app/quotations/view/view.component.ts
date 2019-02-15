/**
 * @author Sonal Prajapati
 * @description this class represent for view  quotation.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
// -------------------------------//
import { QuotationService } from '../quotation.service';
import { Quotation } from '../quotations.model';
import { Customers } from '../../customers/customers.model';
import { Action } from '../../shared/table/table.model';


@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  /**
   * Declare variable
   */
  // store the list of qoutation
  public qoutation: Quotation[];
  // store the list of customers
  public customer: Customers[];
  // store the value of  action
  public action = [Action.EDIT, Action.DELETE];
  // it store the key and name for a header and display in the table
  public heading = {
    name: ['ID', 'Number', 'Issue Date', 'Expiry Date', 'Customer', 'Grand Total', 'Status'],
    key: ['id', 'quotation_number', 'issue_date', 'expiry_date', 'customer_id', 'grand_total', 'status']
  };
  // pagination
  public totalQutation = 150;
  public pageSize = 10;
  public page = 1;
  public searchResult: Quotation[];
  public sortQoutation: Quotation[];
  data1: any;
  data2: any[];
  data3: any[];
  // it  is used for the store the value which is subscribe
  private qoutationSubscription: Subscription;
  constructor(private router: Router, private quotationService: QuotationService) {
    this.customer = [];
    this.searchResult = [];
  }
  // initialize the page
  ngOnInit() {
    this.quotation();
    // this.quotationService.forkJoin().subscribe(responce => {
    //   this.data1 = responce[0];
    //   this.data2 = responce[1];
    //   // console.log(this.data1, this.data2);
    //   this.qoutation = [...this.data1, ...this.data2];
    //   console.log(this.qoutation);
    //   for (let index = 0; index < this.data2.length; index++) {
    //     const element = this.data2[index];
    //     this.data1 = element.name;
    //     console.log(index, this.data1);
    //   }
    // });
  }

  /**
   * It is used for get all the list of the qoutation.
   */
  public quotation(): void {
    this.qoutationSubscription = this.quotationService.getQoutation().subscribe((qoutations) => {
      this.qoutation = qoutations;
      this.getPagination();
      this.qoutation.forEach(qoutation => {
        if (qoutation.customer_id) {
          this.quotationService.getCustomer(qoutation.customer_id).subscribe((customer: any) => {
            if (qoutation.customer_id === customer.id) {
              qoutation.customer_id = customer.name;
              // console.log(qoutation.customer_id = customer.name);
            } else {
              console.log('wrong in');
            }
          });
        }
      });
    });
  }

  /**
   * @description navigate to the add qoutation page
   */
  public onNewOqutation() {
    this.router.navigate(['/quotation/add']);
  }
  /**
   *@description based on the action it will navigate to the page
   */
  public actionClick(action: string, id: number) {
    console.log(action, id);

    // this.quotationService.deleteQoutation(id1).subscribe((data) => {
    //   this.quotation();
    // });
    this.router.navigate(['/qoutation/add']);
  }

  /**
   * @description when user click on the search button it will display record based on the search
   *
   */
  public searchClick(search) {
    this.quotationService.searchList(search).subscribe((data) => {
      this.searchResult = data;
      console.log(this.searchResult);
      this.qoutation = this.searchResult;
    });

  }

  /**
   * it is used for export pdf file when user click on  the export button
   */
  public export(): void {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
  /**
   * for sort a data by user select
   */
  public sort(id: number, value: string): void {
    this.quotationService.sortQoutation(id, value).subscribe((data) => {
      this.sortQoutation = data;
      console.log(this.sortQoutation);
    });
  }
  /**
   *for pagination
   */
  public getPagination(): void {
    this.quotationService.getForPage(this.page, this.pageSize).subscribe(
      (data) => {
        this.qoutation = data;
      });
  }
  public goToPage(pageSize: number): void {
    this.pageSize = pageSize;
    this.page = 1;
    this.quotation();
  }
  // it is call  when user  GO TO  the next page
  ngOnDestroy() {
    this.qoutationSubscription.unsubscribe();
  }
}
