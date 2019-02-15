/**
 * @author Akshita Kapadia
 * @description model for product module
 *
 * @property id is unique for every record which is auto increment
 * @property product_number is unique for every product which have prefix also
 * @property description is for description of product
 * @property uom defines unit of perticular product
 * @property price is for product price
 * @property image is to display product image
 * @property date is for when cutomer purchase product
 * @property group is for which catagory of product
 */
export class Product {
    id: number;
    product_number: string;
    description: string;
    uom: string;
    price: number;
    image: string;
    date: string;
    group: string;
}
