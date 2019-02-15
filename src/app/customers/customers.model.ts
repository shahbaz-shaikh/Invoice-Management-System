/**
 * @author Vaibhavi Prajapati
 * Customer class is model type
 * its contain id, customrNumber,name,company,group, createdAt,email,mobileNumber,address
 * @property id define uniqueIdentifier,
 * @property customerNumber define as string which is auto increament
 * @property Name define customer's name
 * @property company define company name of the customer
 * @property group define group name which belongs to customer
 * @property createdAt define date on which date its created
 * @property email define customer's email
 * @property mobileNumber define customer's mobile numebr
 * @property address define address of the customer
 */
export class Customers {
  id: number;
  customerNumber: string;
  name: string;
  company: string;
  group: string;
  createdAt: Date;
  email: string;
  mobileNumber: number;
  address: string;
}
