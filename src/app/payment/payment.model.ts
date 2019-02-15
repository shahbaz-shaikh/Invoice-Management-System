/**
 * @author - Shahbaz Shaikh
 * @description - This model file are represent of payment Model.
 */

 /**
   * Represents a Order Class.
   * @prop id - This id is payment unique id for payment.
   * @prop payment_number - Thais is a payment number for payment.
   * @prop date - This date is a payment issue date.
   * @prop invoice_id - This invoice_id is relationship with onther table with invoice.
   */
export class Payment {
    id: number;
    payment_number: string;
    date: string;
    invoice_id: number;
}
