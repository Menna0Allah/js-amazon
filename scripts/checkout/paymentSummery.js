import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js" ;
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatPrice } from "../utils/money.js";

export function renderPaymentSummery(){

    let productPrice = 0;
    let shippingPriceCents = 0;

    cart.forEach((item) => {
        const product = getProduct(item.productId);
        productPrice += product.priceCents * item.quantity;

        const deliveryOption = getDeliveryOption(item.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPrice + shippingPriceCents;
    const tax = totalBeforeTax * 0.1;
    const totalPrice = totalBeforeTax + tax;

    const html = `
    <div class="payment-summary">
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${calculateCartQuantity()}):</div>
        <div class="payment-summary-money">$${formatPrice(productPrice)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatPrice(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatPrice(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatPrice(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatPrice(totalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    </div>
    `
    document.querySelector('.js-payment-summary').innerHTML = html;
}