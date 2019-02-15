/**
 * @author Yamini Gala
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mode } from '../../shared/item-description/item-description-data.model';
import { QuotationService } from '../quotation.service';
import { Quotation } from '../quotations.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {
  public quotation: Quotation;
  public customerDetails: Quotation[];
  public productDescription: Quotation[];
  public quotationForm: FormGroup;
  private issuedate: Date;
  private expirydate: Date;
  /**
   * @property mode: give particular mode of enum which you want to apply
   */
  public mode = Mode.Add;
  constructor(private router: Router, private service: QuotationService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.issuedate = new Date();
    this.expirydate = new Date();
    this.expirydate.setDate(this.expirydate.getDate() + 30);
  }
  ngOnInit() {
    this.getCustomer(),
      this.getProduct(),
      this.addQuotation(this.quotation);
  }
  /**
   * navigate to the view page
   */
  public addQuotation(quotation: Quotation) {
    this.quotationForm = this.fb.group({
      customer_id: ['', [Validators.required]],
      issue_date: [this.datePipe.transform(this.issuedate, 'dd-MMM-yyyy')],
      expiry_date: [this.datePipe.transform(this.expirydate, 'dd-MMM-yyyy')],
      status: ['draft'],
      grand_total: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      sgst: ['', [Validators.required]],
      cgst: ['', [Validators.required]],
      qty: ['', [Validators.required]],
    });
  }
  submitQuotation(): void {
    const quotation = Object.assign({}, this.quotationForm.value);
    this.service.addQuotation(quotation).subscribe(() => {
      // Reset the quotation form
      this.router.navigate(['/quotation/view']);
    });
  }
  /**
  * navigate to the view page
  */
  public onCancel() {
    confirm('Are You Sure?');
    this.router.navigate(['/quotation/view']);
  }
  getCustomer(): void {
    this.service.getCustomers().subscribe(customer => {
      this.customerDetails = customer;
    });
  }
  public getProduct(): void {
    this.service.getProduct().subscribe(product => {
      this.productDescription = product;
    });
  }
}
