import './PaymentSummary.css';

export function PaymentSummary({ itemCount, itemsTotal, shippingTotal, taxRate, onPlaceOrder }) {
    const totalBeforeTax = itemsTotal + shippingTotal;
    const tax = Math.round(totalBeforeTax * taxRate);
    const orderTotal = totalBeforeTax + tax;

    const formatMoney = (cents) => `$${(cents / 100).toFixed(2)}`;

    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            <div className="payment-summary-row">
                <div>Items ({itemCount}):</div>
                <div className="payment-summary-money">{formatMoney(itemsTotal)}</div>
            </div>

            <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{formatMoney(shippingTotal)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{formatMoney(totalBeforeTax)}</div>
            </div>

            <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{formatMoney(tax)}</div>
            </div>

            <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">{formatMoney(orderTotal)}</div>
            </div>

            <button className="place-order-button button-primary" onClick={onPlaceOrder}>
                Place your order
            </button>
        </div>
    );
}
