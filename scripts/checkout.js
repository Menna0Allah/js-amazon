import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend.js'

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('hello');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then((values) => {
    console.log(values)
    renderOrderSummery();
    renderPaymentSummery();
});


// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('hello');
//     });
// }).then((value) => {
//     console.log(value)
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         })
//     })
// }).then(() => {
//     renderOrderSummery();
//     renderPaymentSummery();
// })


// loadProducts(()=>{
//     loadCart(() => {
//         renderOrderSummery();
//         renderPaymentSummery();
//     });
// });
