/**
 * @author Yamini Gala
 * @property product: Product model type
 * @property itemCalculation: ItemCalculation model type
 */
export class ItemDescriptionData {
    product: Product[];
    itemCalculation: ItemCalculation;
}
/**
 * @property id: uniqe identifier
 * @property qty: number type 
 */
export class Product {
    id: number;
    qty: number;
}
/**
 * @property total: number type
 * @property discount: number type
 * @property cgst: number type
 * @property sgst: number type
 * @property grandTotal: number type
 */
export class ItemCalculation {
    total: number;
    discount: number;
    cgst: number;
    sgst: number;
    grandTotal: string;
}
/**
 * @property Edit: enum of Edit mode
 * @property Add: enum of Add mode
 * @property View: enum of View mode
 */
export enum Mode {
    Edit = 0,
    Add = 1,
    View = 2,
}