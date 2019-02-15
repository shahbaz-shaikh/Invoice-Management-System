/**
 * @author - Shahbaz Shaikh
 * @description - Create  model class for user.
 * @property id unique identity for user type number.
 * @property name define for user type string.
 * @property title define for user type string.
 * @property email define for user type string.
 * @property mobileNumber define for user type number.
 * @property password define for user type string.
 */
export class UserProfile {
    id: number;
    name: string;
    title: string;
    email: string;
    mobile_number: number;
    password: string;
}
