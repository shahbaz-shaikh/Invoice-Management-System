/**
 * @author Akshita Kapadia
 * this component contains all methods which are use
 * for view page
 */
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Action, ActionEvent } from '../../shared/table/table.model';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Product } from '../products.model';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'ims-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  heading = {
    name: ['Id', 'Item Code', 'Description', 'U.O.M', ' Unit Price', 'Group'],
    key: ['id', 'product_number', 'description', 'uom', 'price', 'group']
  };



  /**
   * @property products contains data of all the products
   * @property totalItems contains number of products
   * @property pageSize stores number of pages
   * @property page contains starting number of page
   * @searchResult stores searched data
   * @orderResult stores result of order
   * @action contains array of which actions perform
   *
   */
  public products: Product[];
  public totalItems = 0;
  public pageSize = 10;
  public page = 1;
  public searchResult: Product;
  public orderResult: Product[];
  public action = [Action.EDIT, Action.DELETE, Action.VIEW];


  /**
   *
   * @param service inject service which have methods to interact with server
   * @param router to navigate on other page
   *
   */
  constructor(private service: ProductsService,
    private router: Router) {

    this.orderResult = [];
    this.products = [];
  }

  /**
   * when page initializes , this method calls
   */
  ngOnInit() {

    this.getProducts();
  }

  /**
   * to generate pdf of view screen
   */
  public export() {
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
   * get products from service using subscribing it
   */
  getProducts() {

    this.service.getProduct().subscribe(product => {
      this.totalItems = product.length;
      if (this.totalItems > 0) {
        this.getPage();
      }
    });
  }

  /**
   * method to perform pagination by subscribing service method
   * and pass serachResult also to perform search with pagination
   */
  public getPage(): void {
    this.service.getPagination(this.page, this.pageSize, this.searchResult ).subscribe(
      (page) => {
        this.products = page;
      }
    );
  }




  /**
   *
   * @param pageSize to select page size
   */
  goToPage(pageSize: number): void {


    this.page = 1;
    this.pageSize = pageSize;

    this.getPage();

  }

  /**
   *
   * @param page to get page action
   * @description to go to next and previous page
   */
  goNextPrev(page: any): void {
    if (page === 'next') {
      this.page++;
    } else if (page === 'prev') {
      this.page--;
    }
    this.getPage();
  }

  /**
   *
   * @param search to serach products and get those products data
   */
  search(search) {

    this.searchResult = search;
    this.getProducts();
  }

  /**
   *
   * @param actionEvent takes two params, id and action
   * @description performs encryption on id and perform navigation on perticular
   * action click
   */
  public actionClick(actionEvent: ActionEvent): any {


    if (actionEvent.action === Action.EDIT) {

      const encryptedId = CryptoJS.AES.encrypt(actionEvent.id.toString().trim(), 'hskag').toString();
      this.router.navigate(['/product/edit/', encryptedId]);
    } else if (actionEvent.action === Action.VIEW) {
      const encryptedId = CryptoJS.AES.encrypt(actionEvent.id.toString().trim(), 'hskag').toString();
      this.router.navigate(['/product/details/', encryptedId]);
    } else if (actionEvent.action === Action.DELETE) {

      if (confirm('sure you want to delete?')) {
        return this.deleteProducts(actionEvent.id);
      } else {
        return false;
      }
    }

  }

  /**
   *
   * @param id delete product of perticular id using subscribe method
   */
  public deleteProducts(id: number): void {

    this.service.deleteProduct(id).subscribe(() => this.getProducts());

  }



}
