/**
 * @author Vaibhavi Prajapati
 */
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrderByKey } from './order-by-keys.model';
import { Sort, Mode } from './sort.model';
import { Key } from 'protractor';


@Component({
  selector: 'ims-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.scss']
})
export class OrderByComponent implements OnInit {
  name: OrderByKey;
  public toggle = true;
  sortBy: string;
  // tslint:disable-next-line:no-inferrable-types
  mode: string = 'DESC';

  /**output for export button */
  @Output() exportData = new EventEmitter<string>();

  /**output for sorting value */
  @Output() sortValue = new EventEmitter<Sort>();

  public Mode = Mode;
  /**key set as input to the orderby element with get and set property*/
  @Input()
  set keys(value: OrderByKey) {
    this.name = value;
    this.sortBy = value[0];
  }
  get keys() {
    return this.name;
  }

  constructor() { }

  ngOnInit() {

  }
  /**When user click on export button its give output to the parent */
  clickExport() {
    this.exportData.emit();

  }
  /**when user select the field its change with selected field */
  sortData(mode: string) {
    this.mode = mode;
    this.sortValue.emit({ value: this.sortBy, mode: mode });
  }


  /** method for toggle up and down arrow
   * Its value can be true or false
   */
  changeArrow() {
    this.toggle = !this.toggle;
  }

  orderBy(e) {
    this.sortBy = e.target.value;
    this.sortData(this.mode);
  }

}
