/**
 *@author Akshita Kapadia
 @description this page is to get details of products
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
// -------------------------------------------------------------------//
import { ProductsService } from '../products.service';
import { Product } from '../products.model';

@Component({
  selector: 'ims-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  /**
   *
   */
  productForm: FormGroup;
  public numberRegEx: string;
  public path: string;
  public fileName: string;
  public product: Product;
  public dd: any = new Date();
  conversionOutput: any;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {
    this.numberRegEx = '^[0-9]*$';
    this.path = '/assets/product-images/';
    this.fileName = '';
  }

  ngOnInit() {

    this.loadForm();

    this.editProducts();
  }

  /**
 * form validations
 */
  public loadForm(): void {
    this.productForm = this.fb.group(
      {
        id: [''],
        product_number: [''],
        description: ['', Validators.required],
        uom: ['', Validators.required],
        price: ['', [Validators.required, Validators.pattern(this.numberRegEx)]],
        group: ['', Validators.required],
        date: this.datePipe.transform(this.dd, 'dd-MMM-yyyy'),
        image: [null, Validators.required]

      }

    );

  }

  /**
 * take the snapshot of id and get data of perticular product
 * and give it to service
 */

  public editProducts(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.conversionOutput = CryptoJS.AES.decrypt(id, 'hskag').toString(CryptoJS.enc.Utf8);

    this.productService.editProduct(this.conversionOutput).subscribe(
      (data) => { this.dataLoad(data); }


    );
  }

  public dataLoad(product: Product) {

    this.productForm.patchValue(
      {
        id: product.id,
        description: product.description,
        uom: product.uom,
        price: product.price,
        group: product.group,
        image: product.image

      }
    );


    //  this.productForm.patchValue({image:this.onFileChange(event)})
    // this.updateProducts(this.product);
    this.onFileChange(event);
  }

  /**
   *
   * @param product stores product data
   * @description to update the data on srvice
   */


  public updateProducts(product): void {


    product.image = this.path + this.fileName;


    this.productService.updateProduct(product).subscribe(() => {


      this.router.navigate(['/product/view']);
    });
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

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        file = event.target.files[0].name;
        this.fileName = file;
      };

    }
  }

}
