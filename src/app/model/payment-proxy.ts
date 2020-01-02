export class PaymentProxy {
    paymentProxy: string;
    status: string;
    active: boolean;
    paymentMethod: string;
    onlyForCurrency: string[];
    //
    description: string;
}

export const PAYMENT_PROXY_DESCRIPTION = {
    'STRIPE': 'Credit card payments',
    'ON_SITE': 'On site (cash) payment',
    'OFFLINE': 'Offline payment (bank transfer, invoice, etc.)',
    'PAYPAL' : 'PayPal'
}