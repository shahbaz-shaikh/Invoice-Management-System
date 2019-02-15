/**
 * @author - Ronak Patel.
 * @description - Create model class for dashboard.
 * @property paidQuotationsId store paid quotation id type number array.
 * @property unpaidQuotationsId store unpaid quotation id type number array.
 * @property totalPaidInvoices store paid invoice amount.
 * @property totalUnpaidInvoices store unpaid amount.
 */
export class Dashboard {
    public paidQuotationsId: number[];
    public unpaidQuotationsId: number[];
    public totalPaidInvoices: number;
    public totalUnpaidInvoices: number;
}
/**
 * @property name define for chart.
 * @property vale define for chart.
 */
export class Chart {
    public name: string;
    public value: number;
}
