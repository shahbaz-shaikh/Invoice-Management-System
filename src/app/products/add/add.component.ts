/**
 * @author Akshita Kapadia
 * @description this file to add the products to form
 * and to generate date and product number with prefix
 */

import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// --------------------------------------------------------------------//

import { ProductsService } from '../products.service';
import { Product } from '../products.model';


@Component({
  selector: 'ims-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']

})


export class AddComponent implements OnInit {
  /**
   * @property productForm to add the product
   * @property numberRegEx to apply validation of number to price field
   * @property patth to take default path for evey image
   * @property fileName to concate file name with prefix path
   */
  productForm: FormGroup;
  public numberRegEx: string;
  public path: string;
  public fileName: string;
  public product: Product[];
  public dd: any = new Date();
  conversionOutput: any;
  public productNumber;

  /**
   *
   * @param toastr to pass toast on save click
   * @param vcr container for toaster
   * @param productService inject service to use service's methods
   * @param fb to build form controls
   * @param route to activate the route
   * @param router to nevigate to other page
   * @param datePipe to store date
   *
   */
  constructor(public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    // private guard:GuardService,
    private cd: ChangeDetectorRef

  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.numberRegEx = '^[0-9]*$';
    this.path = '/assets/product-images/';
    this.fileName = '';

  }


  ngOnInit() {

    this.loadForm();
    this.getProducts();

  }

  public getProducts() {


    this.productService.getProduct().subscribe(
      (prod) => {
        this.product = prod;

        const sliceProductNumber = this.product.slice(-1)[0].product_number;


        // Split the Product number
        const splitProductNumber = sliceProductNumber.split('-');
        const num = splitProductNumber[0];


        const stringToNumber = +splitProductNumber[1];


        const numberIncriment = stringToNumber + 1;


        this.productNumber = num + '-' + numberIncriment;

      }
    );


  }


  /**
   * form validations
   */
  public loadForm(): void {

    this.productForm = this.fb.group(
      {

        id: [''],
        product_number: ['', this.productNumber],
        description: ['', Validators.required],
        uom: ['', Validators.required],
        price: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
        group: ['', Validators.required],
        date: this.datePipe.transform(this.dd, 'dd-MMM-yyyy'),
        image: ['', Validators.required]

      }

    );
    this.onFileChange(event);

  }


  /**
   *
   * takes input from the form and subscribe the method from the service
   * to add products
   */
  public addProducts(product): void {

    product.image = this.path + this.fileName;


    this.productService.addProduct(product).subscribe(
      () => {

        this.router.navigate(['product/view']);

  }
    );

  }

  /**
   *
   *
   * @description This method uses the FileReader
   *  to read the contents of the file and take the result
   *  and patch the form with value.
   * need to run CD since file load runs outside of zone
   */


  onFileChange(event) {


    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      let [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.productForm.patchValue({
          file: reader.result
        });


        this.cd.markForCheck();
        file = event.target.files[0].name;
        this.fileName = file;
      };
    }
  }


  /**
   * toaster method calls when click on save button of the form
   */
  showSuccess() {


    this.toastr.success('success!!');

  }

  /**
   * toaster method calls when i click on cancel
   */
  showError() {

    if (this.productForm.untouched) {
      this.router.navigate(['product/view']);

    } else {
      this.toastr.error('please complete the form!!');
    }
  }

}
