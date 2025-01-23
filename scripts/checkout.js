import { cart, removeItem, calculateCartQuantity, updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatPrice } from "./utils/money.js";

let cartHTML= '';

cart.forEach((item) => {

    let matching;
    products.forEach((product) => {
        if(product.id === item.productId){
            matching = product;
        };
      });
      
    
    cartHTML+=`
    <div class="cart-item-container js-cart-container-${matching.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matching.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matching.name}
                </div>
                <div class="product-price">
                  $${formatPrice(matching.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matching.id}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-update-id="${matching.id}">
                    Update
                  </span>
                  <input type="number" class="quantity-input input-quantity-${matching.id}">
                  <span class="save-quantity-link link-primary" data-save-id="${matching.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-delete-id="${matching.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matching.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    
    
});

document.querySelector('.order-summary').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link').forEach((deleteButton) => {
  deleteButton.addEventListener('click', () => {
    const deleteItemId = deleteButton.dataset.deleteId; 
    removeItem(deleteItemId);
    document.querySelector(`.js-cart-container-${deleteItemId}`).remove();
    updateCartQuantity();
    // call it when click delete
  });
});

function updateCartQuantity(){
  let cartQuantity = Number(calculateCartQuantity());
  
  document.querySelector('.return-to-home-link')
      .innerHTML = `${cartQuantity} items`;
}


updateCartQuantity();
// to call it when the page loads

document.querySelectorAll('.js-update-link').forEach((updateButton) => {
  updateButton.addEventListener('click', () =>{
    const updateItemId = updateButton.dataset.updateId;
    document.querySelector(`.js-cart-container-${updateItemId}`).classList.add('is-editing-quantity');
  })
})

document.querySelectorAll('.save-quantity-link').forEach((saveButton) => {
  saveButton.addEventListener('click', () => {
    const saveItemId = saveButton.dataset.saveId;
    document.querySelector(`.js-cart-container-${saveItemId}`).classList.remove('is-editing-quantity');

    const x = document.querySelector(`.input-quantity-${saveItemId}`);
    const newQuantity = Number(x.value);

    updateQuantity(saveItemId,newQuantity);

    const quantityLabel = document.querySelector(`.js-quantity-label-${saveItemId}`);
    
    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
  })
})

console.log(dayjs().add(7, 'days').format('dddd, MMMM D'))