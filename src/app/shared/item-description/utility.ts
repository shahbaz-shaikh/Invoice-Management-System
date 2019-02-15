/**
 * @author Yamini Gala
 * @description make ItemDescriptionUtil class for static methods which will be used in component directly
 */
export default class ItemDescriptionUtil {
    /**
     * @param myValue pass parameter to static method
     * @param subTotal pass parameter to static method
     * @description static method for calculating discount
     */
    static subtraction(myValue, subTotal) {
        let discount = (subTotal * (myValue / 100))
        return discount;
    }
    /**
     * @param myValue pass parameter to static method
     * @param subTotal pass parameter to static method
     * @description static method for calculating sgst
     */
    static addition(myValue, subTotal) {
        let sgst = (subTotal * (myValue / 100))
        return sgst;
    }
    /**
     * @param myValue pass parameter to static method
     * @param subTotal pass parameter to static method
     * @description static method for calculating cgst
     */
    static add(myValue, subTotal) {
        let cgst = (subTotal * (myValue / 100))
        return cgst;
    }
}