import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend.js'

loadProducts(()=>{
    renderOrderSummery();
    renderPaymentSummery();
});
