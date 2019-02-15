/**
 * @author Yamini Gala
 */
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
// -----------------------------------------------------------
import { Mode } from './item-description-data.model';
import { ItemList } from './item-list.model';
import ItemDescriptionUtil from '../item-description/utility';

@Component({
  selector: 'ims-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss']
})

export class ItemDescriptionComponent implements OnInit {
  /**
   * @property itemForm: Declare as FormGroup type for accessing its property
   * @property itemList: Declare as Array of ItemList model type
   * @property subTotal: Declare as number type
   * @property discountValue: Declare as number type
   * @property sgstValue: Declare as number type
   * @property cgstValue: Declare as number type
   * @property finalTotal: Declare as number type
   */
  public itemForm: FormGroup;
  public itemList: ItemList[];
  public subTotal: number;
  public discountValue: number;
  public sgstValue: number;
  public cgstValue: number;
  public finalTotal: number;
  /**
   * @property mode: Declare enums as Mode
   * pass input to parent with different modes
   */
  @Input() mode: Mode;
  /**
   * @property data:Declare ItemList Array Model type
   * set data use for asyncronous data
   */
  @Input() set data(data: ItemList[]) {
    this.itemList = data;
  }
  /**
   * get data from itemList
   */
  get data() {
    return this.itemList;
  }
  /**
   *
   * @param fb : inject formBuilder for using its property
   */
  constructor(private fb: FormBuilder) {
    // define subTotal as 0 at initial level
    this.subTotal = 0;
  }
  ngOnInit() {
    /**
     * different conditions for appling mode and creating form
     * applied mode and getting data
     */
    if (this.mode === Mode.Add) {
      this.createForm();
    } else if (this.mode === Mode.Edit) {
      this.createForm();
    } else if (this.mode === Mode.View) {
      this.createForm();
    }
  }
  /**
   * createForm method for creating form when page loads
   */
  public createForm(): void {
    this.itemForm = this.fb.group({
      id: [''],
      addNewField: this.fb.array([this.fb.group({
        description: [''],
        uom: [''],
        price: [''],
        qty: [''],
        total: [''],
      })
      ])
    });
  }
  /**
   * Declare addNewField as FormArray and get it from itemForm
   */
  get addNewField(): FormArray {
    return this.itemForm.get('addNewField') as FormArray;
  }
  /**
   * addForm method use for pushing whole group in addNewField array at button click
   */
  public addForm(): void {
    this.addNewField.push(this.fb.group({
      description: [''],
      uom: [''],
      price: [''],
      qty: [''],
      total: [''],
    }));
  }
  /**
   *
   * @param event pass parameter in form method
   * @param formGroupIndex pass parameter in form method
   */
  public onSelectDescription(event, formGroupIndex: number): void {
    this.form(event, formGroupIndex);
  }
  /**
   *
   * @param event  passing whole event to form method and matching it with item's id
   * @param formGroupIndex passing index with number type and giving control with the help of index
   */
  public form(event, formGroupIndex): void {
    const FormArrayName = this.itemForm.controls['addNewField'] as FormArray;
    this.itemList.forEach(
      (item) => {
        // tslint:disable-next-line:triple-equals
        if (item.id == event) {
          FormArrayName.controls[formGroupIndex].patchValue({
            /**
             * patching group's data by giving control to its array
             */
            description: item.id,
            uom: item.uom,
            price: item.price,
            qty: '1',
            total: ''
          });
        }
      }
    );
  }
  /**
   *
   * @param event pass event for patching total
   * @param i passing index for patching on particular field's total
   */
  public onKeyUp(event, i): void {
    this.calculation(i);
  }
  /**
   *
   * @param i index of each field
   */
  public calculation(i): void {
    /**
     * declare addNewField as formArray and getting it from itemForm
     */
    const formArray = this.itemForm.get('addNewField') as FormArray;
    /**
     * giving control in formarray using index total and appling calculation of value in total
     */
    formArray.controls[i].patchValue({
      total: formArray.controls[i].value.qty * formArray.controls[i].value.price,
    });
    /**
     * call calculateSubtotal method whenever total gets its data
     */
    this.calculateSubTotal();
  }
  /**
   * calculate subtotal on base of every fields total as per index
   */
  public calculateSubTotal(): void {
    const formArray = this.itemForm.get('addNewField') as FormArray;
    this.subTotal = 0;
    formArray.controls.forEach(value => {
      this.subTotal += value.value.total;
    });
  }
  /**
   *
   * @param i index of each row
   * giving control to formarray and removing it from itemform using removeAt method
   */
  public deleteRow(i): void {
    const control = <FormArray>this.itemForm.controls.addNewField;
    control.removeAt(i);
    /**
     * after removing field call subTotal method for changing its value
     */
    this.calculateSubTotal();
    /**
     * on base of changing subTotal call grandtotal method for changing its value in form
     */
    this.calculateGrandTotal();
  }
  /**
   *
   * @param discount pass parameter which is used in util method
   * call util method directly for calculating discount
   */
  public calculateDiscount(discount): void {
    this.discountValue = ItemDescriptionUtil.subtraction(discount, this.subTotal);
  }
  /**
   *
   * @param cgst pass parameter which is used in util method
   * call util method directly for calculating cgst
   */
  public calculateCGST(cgst): void {
    this.cgstValue = ItemDescriptionUtil.addition(cgst, this.subTotal);
  }
  /**
   *
   * @param sgst pass parameter which is used in util method
   * call util method directly for calculating sgst
   */
  public calculateSGST(sgst): void {
    this.sgstValue = ItemDescriptionUtil.add(sgst, this.subTotal);
    this.calculateGrandTotal();
  }
  /**
   * calculate grandtotal with the help of discount, sgstValue, cgstValue
   */
  public calculateGrandTotal(): void {
    this.finalTotal = this.subTotal - this.discountValue + this.sgstValue + this.cgstValue;
  }
}

