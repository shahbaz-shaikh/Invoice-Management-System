/**
 * @author - Shahbaz Shaikh
 * @description - This component file are add the payment.
 */
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
// --------------------------------------------- //
import { PaymentService } from '../payment.service';
import { Payment } from '../payment.model';
import { DatePipe } from '@angular/common';
import { Invoice } from '../../invoices/invoices.model';

@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {

  /**
   * Declear the variable
   */
  public sentInvoice: Invoice[];
  public payment: Payment[];
  public paymentForm: FormGroup;
  public incrementPaymentNumber: any;
  private paymentDate: Date;

  /**
   * Inject the service
   * @param service - for payment service
   * @param fb - for usnig form builder in reactive forms
   * @param router - for using one page to another page routing
   * @param datePipe - for transform the data format
   * @param toastr - for using show the toastr message
   * @param vcr - for using toaster message
   */
  constructor(private service: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.sentInvoice = [];
    this.paymentDate = new Date();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getInvoice();
    this.getPayments();
    this.addPayment();
  }

  /**
   * get the invoice deatils those only Sent
   */
  public getInvoice(): void {
    this.service.getSentInvoice()
      .subscribe((sent) => {
        this.sentInvoice = sent;
        console.log(this.sentInvoice);
      });
  }

  /**
   * Get payment deastils
   */
  public getPayments(): void {
    this.service.getAllPayments()
      .subscribe((lastPayment) => {
        this.payment = lastPayment;

        // Get Last record from database
        const lastPaymentNumber = this.payment.slice(-1)[0].payment_number;
        this.paymentNumber(lastPaymentNumber);
      });
  }

  /**
   * incriment payment number
   * @param lastPaymentNumber - Get lastPaymentNumber form get getPayment method
   */
  public paymentNumber(lastPaymentNumber) {
    const splitPaymentNumber = lastPaymentNumber.split('-');
    const pays = splitPaymentNumber[0];
    const stringToNumber = +splitPaymentNumber[1];
    const numberIncriment = stringToNumber + 1;
    const payNumber = pays + '-' + numberIncriment;
    this.incrementPaymentNumber = payNumber;
    this.addPayment();
  }

  /**
   * addpayment method are used to add payment using reactive forms
   */
  public addPayment() {
    this.paymentForm = this.fb.group({
      invoice_id: ['', [Validators.required]],
      payment_number: [this.incrementPaymentNumber],
      date: this.datePipe.transform(this.paymentDate, 'dd-MMM-yyyy')
    });
  }

  /**
   * when user submit the payment form add new payment record on server
   */
  public onSubmit(): void {
    const pay = Object.assign({}, this.paymentForm.value);
    if (window.confirm('Are sure you want to Payment ?')) {
      this.service.addPayment(pay).subscribe(() => {
        this.showSuccess();
        this.updateStatus(pay);
      });
    } else {
      this.router.navigate(['/payment/view']);
    }
  }

  /**
   * updateStatus are update the invoice status from Sent to Paid
   * when success the process to payment
   * @param pay - get invoice id
   */
  private updateStatus(pay: Invoice) {
    pay.status = 'Paid';
    this.service.updateInvoiceStatus(pay).subscribe(() => {
      this.showSuccess();
      this.router.navigate(['/payment/view']);
    });
  }

  /**
   * Show the toastr message for Success message
   */
  public showSuccess() {
    this.toastr.success('Success!');
  }
}
