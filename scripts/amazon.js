import { cart } from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="select-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart add-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-addtocart"
          data-product="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addedTimeout = {};

document.querySelectorAll('.js-addtocart').forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.product;
       
        const quantitySelector = document.querySelector(`.select-${productId}`);
        const selectedQuantity = Number(quantitySelector.value);
        
        let matching = cart.find((item) => item.productId === productId);

        if (matching) {
            matching.quantity += selectedQuantity;
        } else {
            cart.push({
                productId: productId,
                quantity: selectedQuantity,
            });
        }

        const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

        document.querySelector('.cart-quantity').innerHTML = totalCartQuantity;

        const added = document.querySelector(`.add-${productId}`);
        added.classList.add('opacity');

        const previousTimeoutId = addedTimeout[productId];
        if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
        }
        const timeoutId = setTimeout(() => {
            added.classList.remove('opacity');
        }, 2000);
        addedTimeout[productId] = timeoutId;
    });
});
