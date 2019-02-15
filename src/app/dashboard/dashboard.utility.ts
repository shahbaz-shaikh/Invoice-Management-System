/**
 * @author - Ronak Patel.
 * @description - Create class for calculation.
 */
import { Dashboard, Chart } from './dashboard.model';
import { Customers } from '../customers/customers.model';

export default class DashboardUtility {
    /**
     * Create static method to calculate paid and unpaid quotation data type dashboard and return.
     * @param invoices - get data from dashboard component.
     * @returns dashboard.
     */
    static quotationIdTotal(invoices): Dashboard {
        // Create for store dashboard type data.
        const dashboard: Dashboard = new Dashboard();
        dashboard.paidQuotationsId = [];
        dashboard.unpaidQuotationsId = [];
        // collect paidQuotationsId and unpaidQuotationsId and store in array.
        invoices.forEach(invoice => {
            if (invoice.status === 'Paid') {
                dashboard.paidQuotationsId.push(invoice.quotation_id);
            } else {
                dashboard.unpaidQuotationsId.push(invoice.quotation_id);
            }
        });
        return dashboard;
    }
    /**
     * Create static method to calculate paid and unpaid invoices amount and store dashboard and return.
     * @param quotations -get data from dashboard component.
     * @param quotationId -
     * @returns dashboard.
     */
    static invoiceTotal(quotations, quotationId): Dashboard {
        const dashboard: Dashboard = new Dashboard();
        dashboard.paidQuotationsId = quotationId.paidQuotationsId;
        if (dashboard.unpaidQuotationsId !== []) {
            dashboard.unpaidQuotationsId = quotationId.unpaidQuotationsId.length;
        }
        dashboard.totalPaidInvoices = 0;
        dashboard.totalUnpaidInvoices = 0;
        // collect total amount and store in totalPaidInvoices and totalUnpaidInvoices.
        quotations.forEach((quatation: any) => {
            for (let index = 0; index < quotationId.paidQuotationsId.length; index++) {
                if (quatation.id === quotationId.paidQuotationsId[index]) {
                    dashboard.totalPaidInvoices = dashboard.totalPaidInvoices + quatation.grand_total;
                    break;
                }
            }
            for (let index = 0; index < quotationId.unpaidQuotationsId.length; index++) {
                if (quatation.id === quotationId.unpaidQuotationsId[index]) {
                    dashboard.totalUnpaidInvoices = dashboard.totalUnpaidInvoices + quatation.grand_total;
                    break;
                }
            }
        });
        return dashboard;
    }
    /**
     * Create static method to calculate  invoices status and store invoiceData and return.
     * @param invoice Get data form dashboard.
     */
    static invoicesChart(invoices): Chart[] {
        let invoiceStatus: Chart[] = [];
        let paid = 0;
        let draft = 0;
        let sent = 0;
        invoices.forEach(element => {
            if (element.status === 'Paid') {
                paid = paid + 1;
            } else if (element.status === 'Draft') {
                draft = draft + 1;
            } else {
                sent = sent + 1;
            }
        });
        invoiceStatus = [{ name: 'Paid', value: paid },
        { name: 'Draft', value: draft },
        { name: 'Sent', value: sent }];
        return invoiceStatus;
    }


    // create for last 10 invoice display.
    static lastTenInvoices(invoices): any[] {
        const lastTenRecord: any[] = [];
        for (let index = invoices.length - 10; index < invoices.length; index++) {
            lastTenRecord.push(invoices[index]);
        }
        return lastTenRecord;
    }
    // create for last 10 customer display.
    static lastTenCustomers(customers): Customers[] {
        const lastTenRecord: Customers[] = [];
        for (let index = customers.length - 10; index < customers.length; index++) {
            lastTenRecord.push(customers[index]);
        }
        return lastTenRecord;
    }
}

