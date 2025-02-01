import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend.js'

async function loadPage() {
    try{

        // throw 'error1';

        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            loadCart(() => {
                reject('error')
                resolve();
            })
        })

    } catch(error) {
    console.log('unexpected error');
    }

    renderOrderSummery();
    renderPaymentSummery();
}

loadPage()

/*
Promise.all([
    loadProductsFetch(),
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
*/

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
