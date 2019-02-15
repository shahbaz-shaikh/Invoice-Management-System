/**
 * @author Yamini Gala
 */
import { Component, OnInit } from '@angular/core';
// ----------------------------------------------------------------
import { Mode } from '../../shared/item-description/item-description-data.model';

@Component({
  selector: 'ims-item-des-test',
  templateUrl: './item-des-test.component.html',
  styleUrls: ['./item-des-test.component.scss']
})
export class ItemDesTestComponent implements OnInit {
  /**
   * @property items: any model type
   */
  public items: any[];
  /**
   * @property mode: give particular mode of enum which you want to apply
   */
  // mode = Mode.Add;
  mode = Mode.Edit;
  // mode = Mode.View;
  constructor() {
    /**
     * @description array of fake data which you want to display
     */
    this.items = [
      {
        id: 1,
        description: 'Mobile',
        uom: 'cm',
        price: 12000,
        qty: 2,
        total: 24000,

      },
      {
        id: 2,
        description: 'T-shirt',
        uom: 'meter',
        price: 620,
        qty: 1,
        total: 620
      },
      {
        id: 3,
        description: 'Ear-Phones',
        uom: 'meter',
        price: 500,
        qty: 3,
        total: 1500
      },
      {
        id: 4,
        description: 'speaker',
        uom: 'meter',
        price: 400,
        qty: 3,
        total: 1200
      },
      {
        id: 5,
        description: 'saree',
        uom: 'meter',
        price: 1000,
        qty: 3,
        total: 3000
      },
      {
        id: 6,
        description: 'flower-pot',
        uom: 'meter',
        price: 300,
        qty: 3,
        total: 900
      },
      {
        id: 7,
        description: 'micro-wave',
        uom: 'meter',
        price: 5000,
        qty: 3,
        total: 15000
      },
      {
        id: 8,
        description: 'jacket',
        uom: 'meter',
        price: 600,
        qty: 3,
        total: 1800
      },
      {
        id: 9,
        description: 'bag',
        uom: 'meter',
        price: 700,
        qty: 2,
        total: 1400
      },
      {
        id: 10,
        description: 'shoes',
        uom: 'meter',
        price: 800,
        qty: 2,
        total: 1600
      }
    ];
  }

  ngOnInit() { }
}