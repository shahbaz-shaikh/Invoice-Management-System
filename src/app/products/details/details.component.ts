/**
 * @author Akshita Kapadia
 * @description this page is for showing details of perticular id product
 */
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';
// ----------------------------------------------------------//
import { Product } from '../products.model';
import { ProductsService } from '../products.service';


@Component({
  selector: 'ims-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
/**
 * @property products to store product data
 * @property conversionOutput is to store decrypt id
 * @property page to set the starting page number
 * @property pagesize to set the page size
 * @property totalitems to store total records
 * @property to store search result
 * @property product to store perticula id's product
 */

 public  products: Product[];
 public conversionOutput: any;
public product;

/**
 *
 * @param service inject productservice to subscribe service methods
 * @param route to take snapshot of id
 * @param router to navigate to other page
 */
  constructor(private service: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
   ) {
     this.products = [];

   }

   /**
    * when page initialize,we want details of perticular id's product
    * so i call it on onInit()
    */
  ngOnInit() {
    this.getByProductId();

  }
/**
 * to get the details of perticular product from service
 */
  getByProductId() {
    const id = this.route.snapshot.paramMap.get('id');
    this.conversionOutput = CryptoJS.AES.decrypt(id, 'hskag').toString(CryptoJS.enc.Utf8);

    this.service.editProduct(this.conversionOutput).subscribe(
      (prod) => {this.product = prod; }
    );

  }



/**
 *
 * @param id to edit the products of perticular id
 * here i routed tp edit page with encrypted id
 */
public editProducts(id: number): void {

  const encryptedId = CryptoJS.AES.encrypt( id.toString().trim(), 'hskag').toString();
    this.router.navigate(['/product/edit/', encryptedId]);

}

/**
 *
 * @param id to delete the product of perticular id from service
 */

  public deleteProducts(id: number): void {
      this.service.deleteProduct(id).subscribe(() => this.service.getProduct() );
      this.router.navigate(['/product/view']);
  }

}
