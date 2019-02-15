/**
 * @author Vaibhavi Prajapati
 */
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// ------------------------------------------//
import { Customers } from './../customers.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {
  public customerForm: FormGroup;
  public addCustomers: Customers[];
  public createdAt: any = new Date();

  constructor(
    private fb: FormBuilder,
    private customerService: CustomersService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.addCustomers = [];
  }



  ngOnInit() {
    // this.created_at = this.datePipe.transform(this.created_at, 'dd-MMM-yyyy');
    // console.log(this.created_at);

    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      customer_number: [''],
      company: ['', [Validators.pattern('^[a-zA-Z0-9]*$')]],
      group: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile_number: ['', [Validators.maxLength(10), Validators.minLength(10)]],
      created_at: this.datePipe.transform(this.createdAt, 'dd-MMM-yyyy'),
      address: [''],
      note: [''],
      GSTIN: ['']
    });
  }
  addCustomer(value) {

    this.customerService
      .addCustomer(value)
      .subscribe(customer => {
        // this.customer_number = `C-${this.customer_number + 1}`;
        // console.log(this.customer_number);
        this.addCustomers.push(customer);
        this.router.navigate(['customer/view']);
        console.log(this.customerForm.value);
      });
  }
}
